"use client";

import { Building2, Users, FileText, Newspaper, Mail } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function AdminDashboard() {
  const { data: propertiesCount } = useQuery({
    queryKey: ["admin-properties-count"],
    queryFn: async () => {
      const { count } = await supabase.from("th_properties").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: teamCount } = useQuery({
    queryKey: ["admin-team-count"],
    queryFn: async () => {
      const { count } = await supabase.from("th_team_members").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: docsCount } = useQuery({
    queryKey: ["admin-docs-count"],
    queryFn: async () => {
      const { count } = await supabase.from("th_documents").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: newsCount } = useQuery({
    queryKey: ["admin-news-count"],
    queryFn: async () => {
      const { count } = await supabase.from("th_news").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: subscriberCount } = useQuery({
    queryKey: ["admin-subscriber-count"],
    queryFn: async () => {
      const { count } = await supabase.from("th_newsletter_subscribers").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const cards = [
    { title: "Liegenschaften", count: propertiesCount, icon: Building2, link: "/admin/portfolio", color: "text-primary" },
    { title: "Team-Mitglieder", count: teamCount, icon: Users, link: "/admin/team", color: "text-blue-600" },
    { title: "Dokumente", count: docsCount, icon: FileText, link: "/admin/documents", color: "text-amber-600" },
    { title: "News", count: newsCount, icon: Newspaper, link: "/admin/news", color: "text-purple-600" },
    { title: "Newsletter", count: subscriberCount, icon: Mail, link: "/admin/newsletter", color: "text-rose-600" },
  ];

  return (
    <>
    <h1 className="text-2xl font-heading font-medium mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.link}
            className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <card.icon className={`h-8 w-8 ${card.color}`} />
              <div>
                <p className="text-2xl font-bold">{card.count ?? "–"}</p>
                <p className="text-sm text-muted-foreground">{card.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
