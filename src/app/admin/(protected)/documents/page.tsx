"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DocRecord {
  id: string;
  name: string;
  url: string;
  category: string;
  language: string;
  sort_order: number;
}

const categories = [
  { value: "reglemente", label: "Reglemente & Statuten" },
  { value: "prospekte", label: "Prospekte & Broschüren" },
  { value: "geschaeftsberichte", label: "Geschäftsberichte" },
  { value: "reportings", label: "Reportings" },
  { value: "nachhaltigkeits-reportings", label: "Nachhaltigkeits-Reportings" },
  { value: "zeichnen", label: "Zeichnen (Anlagegruppe)" },
];

const emptyForm = { name: "", url: "", category: "reglemente", language: "de", sort_order: 0 };

export default function AdminDocuments() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<DocRecord | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const { data: docs, isLoading } = useQuery({
    queryKey: ["admin-documents"],
    queryFn: async () => {
      const { data, error } = await supabase.from("th_documents").select("*").order("sort_order");
      if (error) throw error;
      return data as DocRecord[];
    },
  });

  const sanitizeFilename = (name: string) => {
    // Split off the extension so we don't mangle the dot
    const lastDot = name.lastIndexOf(".");
    const base = lastDot > 0 ? name.slice(0, lastDot) : name;
    const ext = lastDot > 0 ? name.slice(lastDot) : "";
    const cleanBase = base
      // German umlauts and ß
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
      .replace(/Ä/g, "Ae").replace(/Ö/g, "Oe").replace(/Ü/g, "Ue")
      .replace(/ß/g, "ss")
      // Strip any remaining accents (é, è, à, ñ, ...)
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      // Anything that's not alphanumeric, dash, underscore or dot becomes a dash
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      // Collapse repeated dashes and trim
      .replace(/-+/g, "-").replace(/^-|-$/g, "");
    const cleanExt = ext.toLowerCase().replace(/[^a-z0-9.]/g, "");
    return (cleanBase || "file") + cleanExt;
  };

  const uploadPdf = async (file: File) => {
    const path = `documents/${Date.now()}-${sanitizeFilename(file.name)}`;
    const { error } = await supabase.storage.from("th-documents").upload(path, file);
    if (error) throw error;
    return supabase.storage.from("th-documents").getPublicUrl(path).data.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      let url = form.url;
      if (pdfFile) url = await uploadPdf(pdfFile);
      if (editing) {
        // Don't overwrite sort_order on edit — keep its current position
        const { error } = await supabase
          .from("th_documents")
          .update({ name: form.name, url, category: form.category, language: form.language })
          .eq("id", editing.id);
        if (error) throw error;
      } else {
        // New entry: append at the end of its category + language group
        const siblings = (docs ?? []).filter(
          (d) => d.category === form.category && d.language === form.language
        );
        const nextOrder = siblings.length
          ? Math.max(...siblings.map((d) => d.sort_order)) + 1
          : 0;
        const { error } = await supabase.from("th_documents").insert({
          name: form.name,
          url,
          category: form.category,
          language: form.language,
          sort_order: nextOrder,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-documents"] });
      toast.success(editing ? "Dokument aktualisiert" : "Dokument erstellt");
      resetForm();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("th_documents").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-documents"] });
      toast.success("Dokument gelöscht");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const reorderMutation = useMutation({
    mutationFn: async (updates: { id: string; sort_order: number }[]) => {
      // Update each row individually — Postgres doesn't have a clean batch-update for different values
      const promises = updates.map((u) =>
        supabase.from("th_documents").update({ sort_order: u.sort_order }).eq("id", u.id)
      );
      const results = await Promise.all(promises);
      const firstError = results.find((r) => r.error)?.error;
      if (firstError) throw firstError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-documents"] });
    },
    onError: (e: Error) => toast.error("Reihenfolge speichern fehlgeschlagen: " + e.message),
  });

  const resetForm = () => { setForm(emptyForm); setPdfFile(null); setEditing(null); setOpen(false); };

  const openEdit = (d: DocRecord) => {
    setEditing(d);
    setForm({ name: d.name, url: d.url, category: d.category, language: d.language, sort_order: d.sort_order });
    setOpen(true);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const SortableRow = ({ doc }: { doc: DocRecord }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: doc.id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };
    return (
      <tr ref={setNodeRef} style={style} className="border-t border-border bg-background">
        <td className="p-3 w-10">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none"
            aria-label="Sortieren"
            type="button"
          >
            <GripVertical className="h-4 w-4" />
          </button>
        </td>
        <td className="p-3 font-medium">{doc.name}</td>
        <td className="p-3 text-right">
          <Button variant="ghost" size="sm" onClick={() => openEdit(doc)}><Pencil className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(doc.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
        </td>
      </tr>
    );
  };

  const SortableTable = ({ items, title }: { items: DocRecord[]; title?: string }) => {
    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = items.findIndex((d) => d.id === active.id);
      const newIndex = items.findIndex((d) => d.id === over.id);
      if (oldIndex < 0 || newIndex < 0) return;
      const reordered = arrayMove(items, oldIndex, newIndex);
      // Optimistic local cache update so the UI moves instantly
      queryClient.setQueryData<DocRecord[]>(["admin-documents"], (prev) => {
        if (!prev) return prev;
        const idToOrder = new Map(reordered.map((d, i) => [d.id, i]));
        return prev.map((d) =>
          idToOrder.has(d.id)
            ? { ...d, sort_order: idToOrder.get(d.id)! }
            : d
        );
      });
      reorderMutation.mutate(reordered.map((d, i) => ({ id: d.id, sort_order: i })));
    };

    return (
      <div className="bg-background border border-border rounded-lg overflow-hidden mb-4">
        {title && (
          <div className="bg-muted/50 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </div>
        )}
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="w-10 p-3"></th>
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-right p-3 font-medium">Aktionen</th>
            </tr>
          </thead>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((d) => d.id)} strategy={verticalListSortingStrategy}>
              <tbody>
                {items.map((d) => <SortableRow key={d.id} doc={d} />)}
                {items.length === 0 && <tr><td colSpan={3} className="p-6 text-center text-muted-foreground">Keine Dokumente</td></tr>}
              </tbody>
            </SortableContext>
          </DndContext>
        </table>
      </div>
    );
  };

  const renderCategory = (category: string) => {
    const inCategory = (docs?.filter((d) => d.category === category) ?? [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order);

    // Reglemente has no language split on the public page — show as single list
    if (category === "reglemente") {
      return <SortableTable items={inCategory} />;
    }

    const de = inCategory.filter((d) => d.language === "de");
    const fr = inCategory.filter((d) => d.language === "fr");

    return (
      <>
        <SortableTable items={de} title="Deutsch" />
        <SortableTable items={fr} title="Französisch" />
      </>
    );
  };

  return (
    <>
    <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-medium">Dokumente</h1>
        <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); setOpen(v); }}>
          <DialogTrigger asChild>
            <Button className="rounded-md"><Plus className="mr-2 h-4 w-4" />Neues Dokument</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{editing ? "Bearbeiten" : "Neues Dokument"}</DialogTitle></DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
              <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="rounded-md" /></div>
              <div>
                <Label>Kategorie</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="rounded-md"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Sprache</Label>
                <Select value={form.language} onValueChange={(v) => setForm({ ...form, language: v })}>
                  <SelectTrigger className="rounded-md"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="fr">Französisch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>PDF hochladen</Label>
                <Input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} className="rounded-md" />
              </div>
              <div>
                <Label>Oder URL eingeben</Label>
                <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." className="rounded-md" />
              </div>
              <p className="text-xs text-muted-foreground">Reihenfolge wird per Drag &amp; Drop in der Liste festgelegt.</p>
              <Button type="submit" disabled={saveMutation.isPending} className="w-full rounded-md">{saveMutation.isPending ? "Speichern..." : "Speichern"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? <p className="text-muted-foreground">Laden...</p> : (
        <Tabs defaultValue="reglemente">
          <TabsList className="mb-4">
            {categories.map((c) => <TabsTrigger key={c.value} value={c.value}>{c.label}</TabsTrigger>)}
          </TabsList>
          {categories.map((c) => <TabsContent key={c.value} value={c.value}>{renderCategory(c.value)}</TabsContent>)}
        </Tabs>
      )}
    </>
  );
}
