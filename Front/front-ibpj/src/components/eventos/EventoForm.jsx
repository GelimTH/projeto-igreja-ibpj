
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save } from "lucide-react";

const tiposEvento = [
  { value: "culto", label: "Culto" },
  { value: "estudo_biblico", label: "Estudo Bíblico" },
  { value: "reuniao_oracao", label: "Reunião de Oração" },
  { value: "evento_especial", label: "Evento Especial" },
  { value: "vigilia", label: "Vigília" },
  { value: "encontro_jovens", label: "Encontro de Jovens" },
  { value: "escola_dominical", label: "Escola Dominical" },
  { value: "outro", label: "Outro" }
];

export default function EventoForm({ evento, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(evento || {
    titulo: "",
    descricao: "",
    data: "",
    hora: "",
    tipo: "culto",
    local: "Igreja IBPJ" // Updated from IBPI to IBPJ
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-6"
    >
      <Card className="bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            {evento ? "Editar Evento" : "Novo Evento"}
            <Button variant="ghost" size="icon" onClick={onCancel} className="text-white">
              <X className="w-5 h-5" />
            </Button>
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="titulo" className="text-white">Título</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                placeholder="Nome do evento"
              />
            </div>

            <div>
              <Label htmlFor="descricao" className="text-white">Descrição</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-24"
                placeholder="Detalhes do evento"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="data" className="text-white">Data</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  required
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="hora" className="text-white">Horário</Label>
                <Input
                  id="hora"
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  required
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tipo" className="text-white">Tipo de Evento</Label>
              <Select
                value={formData.tipo}
                onValueChange={(value) => setFormData({ ...formData, tipo: value })}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tiposEvento.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="local" className="text-white">Local</Label>
              <Input
                id="local"
                value={formData.local}
                onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                placeholder="Local do evento"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel} className="border-white/20 text-white hover:bg-white/10">
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#D4AF37] hover:bg-[#B8941E] text-[#001B3D]">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
