"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo_url: string | null;
  phone: string | null;
  email: string | null;
  bio: string | null;
  type: string;
  sort_order: number;
}

const emptyForm = { name: "", role: "", phone: "", email: "", bio: "", type: "team", sort_order: 0 };

export default function AdminTeam() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: members, isLoading } = useQuery({
    queryKey: ["admin-team"],
    queryFn: async () => {
      const { data, error } = await supabase.from("th_team_members").select("*").order("sort_order");
      if (error) throw error;
      return data as TeamMember[];
    },
  });

  const uploadImage = async (file: File) => {
    const ext = file.name.split(".").pop();
    const path = `team/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("th-images").upload(path, file);
    if (error) throw error;
    return supabase.storage.from("th-images").getPublicUrl(path).data.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      let photo_url = editing?.photo_url || null;
      if (imageFile) photo_url = await uploadImage(imageFile);
      const payload = { ...form, photo_url };
      if (editing) {
        const { error } = await supabase.from("th_team_members").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("th_team_members").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-team"] });
      toast.success(editing ? "Mitglied aktualisiert" : "Mitglied erstellt");
      resetForm();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("th_team_members").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-team"] });
      toast.success("Mitglied gelöscht");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditing(null);
    setOpen(false);
  };

  const openEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({
      name: m.name, role: m.role, phone: m.phone || "", email: m.email || "",
      bio: m.bio || "", type: m.type, sort_order: m.sort_order,
    });
    setOpen(true);
  };

  const renderTable = (type: string) => {
    const filtered = members?.filter((m) => m.type === type) ?? [];
    return (
      <div className="bg-background border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3 font-medium">Foto</th>
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Rolle</th>
              <th className="text-right p-3 font-medium">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id} className="border-t border-border">
                <td className="p-3">
                  {m.photo_url ? <img src={m.photo_url} alt={m.name} className="h-10 w-10 object-cover rounded-full" /> : <div className="h-10 w-10 bg-muted rounded-full" />}
                </td>
                <td className="p-3 font-medium">{m.name}</td>
                <td className="p-3 text-muted-foreground">{m.role}</td>
                <td className="p-3 text-right">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(m)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Keine Einträge</td></tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
    <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-medium">Team & Stiftungsrat</h1>
        <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); setOpen(v); }}>
          <DialogTrigger asChild>
            <Button className="rounded-md"><Plus className="mr-2 h-4 w-4" />Neues Mitglied</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Bearbeiten" : "Neues Mitglied"}</DialogTitle></DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
              <div>
                <Label>Typ</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger className="rounded-md"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="stiftungsrat">Stiftungsrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="rounded-md" /></div>
              <div><Label>Rolle</Label><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required className="rounded-md" /></div>
              <div><Label>Telefon</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-md" /></div>
              <div><Label>E-Mail</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-md" /></div>
              <div><Label>Bio</Label><Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="rounded-md" /></div>
              <div>
                <Label>Foto</Label>
                <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="rounded-md" />
                {editing?.photo_url && !imageFile && <img src={editing.photo_url} alt="" className="mt-2 h-16 rounded" />}
              </div>
              <div><Label>Sortierung</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="rounded-md" /></div>
              <Button type="submit" disabled={saveMutation.isPending} className="w-full rounded-md">{saveMutation.isPending ? "Speichern..." : "Speichern"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? <p className="text-muted-foreground">Laden...</p> : (
        <Tabs defaultValue="team">
          <TabsList className="mb-4">
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="stiftungsrat">Stiftungsrat</TabsTrigger>
          </TabsList>
          <TabsContent value="team">{renderTable("team")}</TabsContent>
          <TabsContent value="stiftungsrat">{renderTable("stiftungsrat")}</TabsContent>
        </Tabs>
      )}
    </>
  );
}
