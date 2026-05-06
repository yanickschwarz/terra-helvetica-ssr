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
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

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
      const payload = { ...form, url };
      if (editing) {
        const { error } = await supabase.from("th_documents").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("th_documents").insert(payload);
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

  const resetForm = () => { setForm(emptyForm); setPdfFile(null); setEditing(null); setOpen(false); };

  const openEdit = (d: DocRecord) => {
    setEditing(d);
    setForm({ name: d.name, url: d.url, category: d.category, language: d.language, sort_order: d.sort_order });
    setOpen(true);
  };

  const renderCategory = (category: string) => {
    const filtered = docs?.filter((d) => d.category === category) ?? [];
    return (
      <div className="bg-background border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Sprache</th>
              <th className="text-right p-3 font-medium">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.id} className="border-t border-border">
                <td className="p-3 font-medium">{d.name}</td>
                <td className="p-3 text-muted-foreground uppercase">{d.language}</td>
                <td className="p-3 text-right">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(d)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(d.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={3} className="p-6 text-center text-muted-foreground">Keine Dokumente</td></tr>}
          </tbody>
        </table>
      </div>
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
              <div><Label>Sortierung</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="rounded-md" /></div>
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
