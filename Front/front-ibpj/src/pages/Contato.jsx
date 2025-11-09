import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Facebook, MessageCircle, Mail, Phone, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Contato() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* --- CABEÇALHO (Inalterado) --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 rounded-full px-6 py-2 mb-6">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[#D4AF37] text-sm font-medium">Fale Conosco</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Entre em Contato
        </h1>
        <p className="text-white/70 text-lg">
          Estamos aqui para servir e te acolher
        </p>
      </motion.div>

      {/* --- ENDEREÇO E HORÁRIO (Inalterado) --- */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Endereço */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-white/5 backdrop-blur-md border-white/10 h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* IFRAME DO GOOGLE MAPS (Substituindo o texto) */}
              <div className="h-48 md:h-64 p-0 overflow-hidden rounded-lg mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!3m2!1spt-BR!2sbr!4v1762152432603!5m2!1spt-BR!2sbr!6m8!1m7!1sN5fuga2wfJNTln9i6ROWQA!2m2!1d-23.55837061169701!2d-46.82610380342376!3f163.94645266015942!4f-8.223781712750153!5f0.7820865974627469" width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <p className="text-white/90 text-lg mb-2">
                Rua Walderez Perez Xavier Giorgi
              </p>
              <p className="text-white/70">
                Parque Jandaia
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Horários */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941E]/10 backdrop-blur-md border-[#D4AF37]/30 h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                </div>
                Horário de Culto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/70 text-sm mb-1">Todos os dias</p>
                  <p className="text-white text-xl font-semibold">18h00 - 20h00</p>
                </div>
                <p className="text-white/70">
                  Venha nos visitar! Todos são bem-vindos para adorar e compartilhar
                  a Palavra de Deus conosco.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* --- SEÇÃO CONECTE-SE (CORRIGIDA) --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-center">
              Conecte-se Conosco
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Grid principal com 3 colunas em telas grandes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Coluna 1: Facebook */}
              <a href="URL_DO_SEU_FACEBOOK" target="_blank" rel="noopener noreferrer">
                <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Facebook className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Facebook</h3>
                  <p className="text-white/70">Siga nossa página</p>
                </Card>
              </a>

              {/* Coluna 2: WhatsApp */}
              <a href="URL_DO_SEU_WHATSAPP_API" target="_blank" rel="noopener noreferrer">
                <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">WhatsApp</h3>
                  <p className="text-white/70">Fale conosco</p>
                </Card>
              </a>

              {/* Coluna 3: Email e Telefone (Movidos de baixo) */}
              <div className="md:col-span-1 space-y-6">
                {/* Email */}
                <Card className="bg-white/5 border-white/10 p-6 h-full">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                    Email
                  </h3>
                  <p className="text-white/70">contato@ibpj.org.br</p>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                    Telefone
                  </h3>
                  <p className="text-white/70">(21) 99999-9999</p>
                </Card>
              </div>

            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* A seção "Informações Adicionais" foi movida para cima e removida daqui */}

    </div>
  );
}