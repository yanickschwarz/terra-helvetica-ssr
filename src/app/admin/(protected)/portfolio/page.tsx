"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Property {
  id: string;
  name: string;
  location: string;
  image_url: string | null;
  description: string | null;
  sort_order: number;
}

export default function AdminPortfolio() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Property | null>(null);
  const [form, setForm] = useState({ name: "", location: "", description: "", sort_order: 0 });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: properties, isLoading } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("th_properties")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as Property[];
    },
  });

  const uploadImage = async (file: File) => {
    const ext = file.name.split(".").pop();
    const path = `properties/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("th-images").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("th-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      let image_url = editing?.image_url || null;
      if (imageFile) {
        image_url = await uploadImage(imageFile);
      }
      const payload = { ...form, image_url };
      if (editing) {
        const { error } = await supabase.from("th_properties").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("th_properties").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
      toast.success(editing ? "Liegenschaft aktualisiert" : "Liegenschaft erstellt");
      resetForm();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("th_properties").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
      toast.success("Liegenschaft gelöscht");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const resetForm = () => {
    setForm({ name: "", location: "", description: "", sort_order: 0 });
    setImageFile(null);
    setEditing(null);
    setOpen(false);
  };

  const openEdit = (p: Property) => {
    setEditing(p);
    setForm({ name: p.name, location: p.location, description: p.description || "", sort_order: p.sort_order });
    setOpen(true);
  };

  return (
    <>
    <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-medium">Liegenschaften</h1>
        <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); setOpen(v); }}>
          <DialogTrigger asChild>
            <Button className="rounded-md"><Plus className="mr-2 h-4 w-4" />Neue Liegenschaft</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? "Bearbeiten" : "Neue Liegenschaft"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="rounded-md" />
              </div>
              <div>
                <Label>Standort</Label>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required className="rounded-md" />
              </div>
              <div>
                <Label>Beschreibung</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-md" />
              </div>
              <div>
                <Label>Bild</Label>
                <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="rounded-md" />
                {editing?.image_url && !imageFile && (
                  <img src={editing.image_url} alt="" className="mt-2 h-20 object-cover rounded" />
                )}
              </div>
              <div>
                <Label>Sortierung</Label>
                <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="rounded-md" />
              </div>
              <Button type="submit" disabled={saveMutation.isPending} className="w-full rounded-md">
                {saveMutation.isPending ? "Speichern..." : "Speichern"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Laden...</p>
      ) : (
        <div className="bg-background border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-medium">Bild</th>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">Standort</th>
                <th className="text-left p-3 font-medium">Sortierung</th>
                <th className="text-right p-3 font-medium">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {properties?.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-3">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="h-12 w-16 object-cover rounded" />
                    ) : (
                      <div className="h-12 w-16 bg-muted rounded" />
                    )}
                  </td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3 text-muted-foreground">{p.location}</td>
                  <td className="p-3 text-muted-foreground">{p.sort_order}</td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(p)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(p.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
              {properties?.length === 0 && (
                <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Keine Liegenschaften vorhanden</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
