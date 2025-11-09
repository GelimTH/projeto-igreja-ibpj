import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UploadFile } from '../../integrations/Core.js';
import { X, Save, Upload, Loader2, Info } from "lucide-react"; // Importar Info

// 1. Importar o Dialog
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function PostagemForm({ postagem, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(postagem || {
    titulo: "",
    descricao: "",
    data: "",
    hora: "",
    imagem_url: "",
    destaque: false
  });
  const [isUploading, setIsUploading] = useState(false);

  // 2. Novo state para o modal de informação
  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    message: '',
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      setFormData({ ...formData, imagem_url: file_url });
    } catch (error) {
      // 3. SUBSTITUIR alert() pelo modal
      setInfoModal({ isOpen: true, message: "Erro ao fazer upload da imagem. Tente novamente." });
    }
    setIsUploading(false);
  };

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
            {postagem ? "Editar Postagem" : "Nova Postagem"}
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
                placeholder="Título da postagem"
              />
            </div>

            <div>
              <Label htmlFor="descricao" className="text-white">Descrição</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-32"
                placeholder="Descreva a atividade ou evento"
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
                <Label htmlFor="hora" className="text-white">Horário (Opcional)</Label>
                <Input
                  id="hora"
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-white">Imagem (Opcional)</Label>
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                    disabled={isUploading}
                    onClick={() => document.getElementById('image-upload').click()}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload de Imagem
                      </>
                    )}
                  </Button>
                </label>
                {formData.imagem_url && (
                  <div className="mt-3">
                    <img
                      src={formData.imagem_url.startsWith('http') ? formData.imagem_url : `http://localhost:4000${formData.imagem_url}`}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="destaque"
                checked={formData.destaque}
                onCheckedChange={(checked) => setFormData({ ...formData, destaque: checked })}
              />
              <Label htmlFor="destaque" className="text-white cursor-pointer">
                Destacar esta postagem
              </Label>
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

      {/* 4. NOVO: Modal de Informação (Dialog - Substituto do alert) */}
      <Dialog open={infoModal.isOpen} onOpenChange={(isOpen) => setInfoModal({ ...infoModal, isOpen })}>
        <DialogContent className="bg-[#001B3D]/80 backdrop-blur-md border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-primary flex items-center gap-2">
              <Info className="w-5 h-5" />
              Aviso de Upload
            </DialogTitle>
          </DialogHeader>
          <div className="text-white/90">
            {infoModal.message}
          </div>
          <DialogFooter>
            <Button 
              className="bg-[#D4AF37] text-[#001B3D] hover:bg-[#D4AF37]/90"
              onClick={() => setInfoModal({ isOpen: false, message: '' })}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}