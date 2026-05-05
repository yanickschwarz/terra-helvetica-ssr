"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Download, Plus } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useState } from "react";

interface Subscriber {
  id: string;
  anrede: string | null;
  vorname: string | null;
  nachname: string | null;
  email: string;
  is_active: boolean;
  subscribed_at: string;
}

export default function AdminNewsletter() {
  const queryClient = useQueryClient();
  const [newEmail, setNewEmail] = useState("");

  const { data: subscribers, isLoading } = useQuery({
    queryKey: ["admin-newsletter"],
    queryFn: async () => {
      const { data, error } = await supabase.from("th_newsletter_subscribers").select("*").order("subscribed_at", { ascending: false });
      if (error) throw error;
      return data as Subscriber[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("th_newsletter_subscribers").insert({ email: newEmail });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-newsletter"] });
      toast.success("Abonnent hinzugefügt");
      setNewEmail("");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("th_newsletter_subscribers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-newsletter"] });
      toast.success("Abonnent entfernt");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const exportCsv = () => {
    if (!subscribers?.length) return;
    const csv = "Anrede,Vorname,Nachname,E-Mail,Anmeldedatum,Aktiv\n" +
      subscribers.map((s) => `${s.anrede ?? ""},${s.vorname ?? ""},${s.nachname ?? ""},${s.email},${format(new Date(s.subscribed_at), "dd.MM.yyyy")},${s.is_active ? "Ja" : "Nein"}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-abonnenten.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
    <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-medium">Newsletter Abonnenten</h1>
        <Button variant="outline" className="rounded-md" onClick={exportCsv}>
          <Download className="mr-2 h-4 w-4" />CSV Export
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="E-Mail hinzufügen..."
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="max-w-sm rounded-md"
        />
        <Button onClick={() => addMutation.mutate()} disabled={!newEmail || addMutation.isPending} className="rounded-md">
          <Plus className="mr-2 h-4 w-4" />Hinzufügen
        </Button>
      </div>

      {isLoading ? <p className="text-muted-foreground">Laden...</p> : (
        <div className="bg-background border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">E-Mail</th>
                <th className="text-left p-3 font-medium">Anmeldedatum</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-right p-3 font-medium">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {subscribers?.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="p-3 font-medium">
                    {[s.anrede, s.vorname, s.nachname].filter(Boolean).join(" ") || "—"}
                  </td>
                  <td className="p-3 text-muted-foreground">{s.email}</td>
                  <td className="p-3 text-muted-foreground">{format(new Date(s.subscribed_at), "dd.MM.yyyy")}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-md ${s.is_active ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                      {s.is_active ? "Aktiv" : "Inaktiv"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(s.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
              {subscribers?.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Keine Abonnenten</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
