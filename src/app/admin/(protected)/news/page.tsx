"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface NewsItem {
  id: string;
  title: string;
  subtitle: string | null;
  content: string | null;
  image_url: string | null;
  document_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

const emptyForm = { title: "", subtitle: "", content: "", is_published: false };

export default function AdminNews() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);

  const { data: news, isLoading } = useQuery({
    queryKey: ["admin-news"],
    queryFn: async () => {
      const { data, error } = await supabase.from("th_news").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as NewsItem[];
    },
  });

  const uploadFile = async (file: File, bucket: string, folder: string) => {
    const path = `${folder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) throw error;
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      let image_url = editing?.image_url || null;
      let document_url = editing?.document_url || null;
      if (imageFile) image_url = await uploadFile(imageFile, "th-images", "news");
      if (docFile) document_url = await uploadFile(docFile, "th-documents", "news");
      const payload = {
        ...form,
        image_url,
        document_url,
        published_at: form.is_published ? new Date().toISOString() : null,
      };
      if (editing) {
        const { error } = await supabase.from("th_news").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("th_news").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      toast.success(editing ? "News aktualisiert" : "News erstellt");
      resetForm();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("th_news").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      toast.success("News gelöscht");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const resetForm = () => { setForm(emptyForm); setImageFile(null); setDocFile(null); setEditing(null); setOpen(false); };

  const openEdit = (n: NewsItem) => {
    setEditing(n);
    setForm({ title: n.title, subtitle: n.subtitle || "", content: n.content || "", is_published: n.is_published });
    setOpen(true);
  };

  return (
    <>
    <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-medium">News</h1>
        <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); setOpen(v); }}>
          <DialogTrigger asChild>
            <Button className="rounded-md"><Plus className="mr-2 h-4 w-4" />Neuer Bericht</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Bearbeiten" : "Neuer Bericht"}</DialogTitle></DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
              <div><Label>Titel</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="rounded-md" /></div>
              <div><Label>Untertitel</Label><Input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="rounded-md" /></div>
              <div><Label>Text</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} className="rounded-md" /></div>
              <div>
                <Label>Bild</Label>
                <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="rounded-md" />
                {editing?.image_url && !imageFile && <img src={editing.image_url} alt="" className="mt-2 h-16 rounded" />}
              </div>
              <div>
                <Label>Dokument (PDF)</Label>
                <Input type="file" accept=".pdf" onChange={(e) => setDocFile(e.target.files?.[0] || null)} className="rounded-md" />
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} />
                <Label>Veröffentlicht</Label>
              </div>
              <Button type="submit" disabled={saveMutation.isPending} className="w-full rounded-md">{saveMutation.isPending ? "Speichern..." : "Speichern"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? <p className="text-muted-foreground">Laden...</p> : (
        <div className="bg-background border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-medium">Titel</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Datum</th>
                <th className="text-right p-3 font-medium">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {news?.map((n) => (
                <tr key={n.id} className="border-t border-border">
                  <td className="p-3 font-medium">{n.title}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-md ${n.is_published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {n.is_published ? "Veröffentlicht" : "Entwurf"}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">{format(new Date(n.created_at), "dd.MM.yyyy")}</td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(n)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(n.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
              {news?.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Keine News</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
