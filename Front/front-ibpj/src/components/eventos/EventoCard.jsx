import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Tag, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const tipoColors = {
  culto: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  estudo_biblico: "bg-green-500/20 text-green-300 border-green-500/30",
  reuniao_oracao: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  evento_especial: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  vigilia: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  encontro_jovens: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  escola_dominical: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  outro: "bg-gray-500/20 text-gray-300 border-gray-500/30"
};

const tipoLabels = {
  culto: "Culto",
  estudo_biblico: "Estudo Bíblico",
  reuniao_oracao: "Reunião de Oração",
  evento_especial: "Evento Especial",
  vigilia: "Vigília",
  encontro_jovens: "Encontro de Jovens",
  escola_dominical: "Escola Dominical",
  outro: "Outro"
};

export default function EventoCard({ evento, isAdmin, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="bg-white/5 backdrop-blur-md border-white/10 p-4 hover:bg-white/10 transition-all duration-300">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{evento.titulo}</h3>
                <Badge className={`${tipoColors[evento.tipo]} border`}>
                  <Tag className="w-3 h-3 mr-1" />
                  {tipoLabels[evento.tipo]}
                </Badge>
              </div>
            </div>

            {evento.descricao && (
              <p className="text-white/70 mb-3">{evento.descricao}</p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {format(new Date(evento.data), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {evento.hora}
              </div>
              {evento.local && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {evento.local}
                </div>
              )}
            </div>
          </div>

          {isAdmin && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(evento)}
                className="text-white hover:bg-white/10"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(evento.id)}
                className="text-rose-400 hover:bg-rose-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}