import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Edit, Trash2, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function PostagemCard({ postagem, isAdmin, onEdit, onDelete, isDestaque = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className={`backdrop-blur-md border-white/10 overflow-hidden hover:scale-105 transition-transform duration-300 ${
        isDestaque 
          ? "bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941E]/10 border-[#D4AF37]/30" 
          : "bg-white/5"
      }`}>
        {postagem.imagem_url && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={postagem.imagem_url}
              alt={postagem.titulo}
              className="w-full h-full object-cover"
            />
            {postagem.destaque && (
              <Badge className="absolute top-4 right-4 bg-[#D4AF37] text-[#001B3D] border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                Destaque
              </Badge>
            )}
          </div>
        )}
        <CardContent className="p-6">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">
                {postagem.titulo}
              </h3>
              {!postagem.imagem_url && postagem.destaque && (
                <Badge className="bg-[#D4AF37] text-[#001B3D] border-0 mb-2">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Destaque
                </Badge>
              )}
            </div>
            {isAdmin && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(postagem)}
                  className="text-white hover:bg-white/10"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(postagem.id)}
                  className="text-rose-400 hover:bg-rose-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          <p className="text-white/70 mb-4 line-clamp-3">
            {postagem.descricao}
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(postagem.data), "d 'de' MMMM", { locale: ptBR })}
            </div>
            {postagem.hora && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {postagem.hora}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}