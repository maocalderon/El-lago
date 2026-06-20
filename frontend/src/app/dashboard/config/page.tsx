"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPatch } from "@/lib/api";
import type { MessageTemplate } from "@/types/api";

export default function ConfigPage() {
  const [confirmedTmpl, setConfirmedTmpl] = useState<MessageTemplate | null>(null);
  const [cancelledTmpl, setCancelledTmpl] = useState<MessageTemplate | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [saveType, setSaveType] = useState<"success" | "error">("success");
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet<{ confirmed: MessageTemplate; cancelled: MessageTemplate }>("/api/dashboard/message-template/")
      .then((d) => { setConfirmedTmpl(d.confirmed); setCancelledTmpl(d.cancelled); })
      .catch((e) => setError(e instanceof Error ? e.message : "Error al cargar plantillas"));
  }, []);

  const handleSaveTemplate = async (type: "confirmed" | "cancelled") => {
    const tmpl = type === "confirmed" ? confirmedTmpl : cancelledTmpl;
    if (!tmpl) return;
    setSaving(true);
    setSaveMsg("");
    try {
      await apiPatch("/api/dashboard/message-template/", {
        type,
        subject: tmpl.subject,
        body_text: tmpl.body_text,
        body_html: tmpl.body_html,
      });
      setSaveType("success");
      setSaveMsg("Plantilla guardada");
    } catch {
      setSaveType("error");
      setSaveMsg("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="space-y-8">
        {[confirmedTmpl, cancelledTmpl].map((tmpl) => {
          if (!tmpl) return null;
          const type = tmpl.type;
          return (
            <div key={type} className="rounded-lg border bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                {type === "confirmed" ? "Confirmación" : "Cancelación"}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Asunto</label>
                  <input
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={tmpl.subject}
                    onChange={(e) => {
                      const upd = { ...tmpl, subject: e.target.value };
                      type === "confirmed" ? setConfirmedTmpl(upd) : setCancelledTmpl(upd);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Texto plano</label>
                  <textarea
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono"
                    rows={6}
                    value={tmpl.body_text}
                    onChange={(e) => {
                      const upd = { ...tmpl, body_text: e.target.value };
                      type === "confirmed" ? setConfirmedTmpl(upd) : setCancelledTmpl(upd);
                    }}
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Variables: {'{name}'}, {'{zone}'}, {'{date}'}, {'{time}'}, {'{people}'}, {'{phone}'}, {'{email}'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleSaveTemplate(type)}
                disabled={saving}
                className="mt-4 rounded-lg bg-[#0f8fc7] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0a355d] disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar plantilla"}
              </button>
            </div>
          );
        })}
      </div>

      {saveMsg && (
        <div className={`mt-4 rounded-md px-4 py-3 text-sm ${
          saveType === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}>{saveMsg}</div>
      )}
    </div>
  );
}
