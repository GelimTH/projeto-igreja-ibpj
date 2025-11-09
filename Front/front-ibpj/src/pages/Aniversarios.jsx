import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cake, Sparkles } from "lucide-react";
import { format } from "date-fns"; // Removemos isSameMonth e isSameDay
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";

// Função de correção do fuso horário UTC
// Trata a data "2004-11-12T00:00:00Z" como "12 de Novembro" no fuso local
function parseDateAsLocal(dateString) {
  if (!dateString) return null;
  const datePart = dateString.split('T')[0];
  const [year, month, day] = datePart.split('-').map(Number);
  // Mês no JS é 0-indexado (0 = Jan, 10 = Nov)
  return new Date(year, month - 1, day);
}

export default function Aniversariantes() {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    setIsLoading(true);
    try {
      const data = await User.list();
      const usuariosComAniversario = data.filter(u => u.data_nascimento);
      setUsuarios(usuariosComAniversario);
    } catch (error) {
      console.error("Falha ao carregar usuários:", error);
    }
    setIsLoading(false);
  };

  // Filtra usuários comparando APENAS o mês (ignorando o ano)
  const aniversariantesDoMes = usuarios.filter(usuario => {
    if (!usuario.data_nascimento) return false;
    
    const dataCorrigida = parseDateAsLocal(usuario.data_nascimento);
    const hoje = new Date();
    
    // A CORREÇÃO: Compara Mês (0-11) com Mês (0-11)
    return dataCorrigida.getMonth() === hoje.getMonth(); 

  }).sort((a, b) => {
    // Ordena pelo dia
    const diaA = parseDateAsLocal(a.data_nascimento).getDate();
    const diaB = parseDateAsLocal(b.data_nascimento).getDate();
    return diaA - diaB;
  });

  // Verifica se é o dia E o mês (ignorando o ano)
  const isAniversarioHoje = (dataNascimento) => {
    if (!dataNascimento) return false;
    const hoje = new Date();
    const aniversario = parseDateAsLocal(dataNascimento);
    
    // A CORREÇÃO: Compara Dia com Dia E Mês com Mês
    return hoje.getDate() === aniversario.getDate() && 
           hoje.getMonth() === aniversario.getMonth();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* --- CABEÇALHO --- */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 rounded-full px-6 py-2 mb-6">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[#D4AF37] text-sm font-medium">Celebrando Vidas</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Aniversariantes do Mês
        </h1>
        <p className="text-white/70">
          Celebre com a comunidade IBPJ
        </p>
      </div>

      {/* --- CONTEÚDO --- */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto"></div>
        </div>
      ) : aniversariantesDoMes.length === 0 ? (
        // Se a lista estiver vazia
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="text-center py-12">
            <Cake className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/50 text-lg">
              Nenhum aniversariante este mês
            </p>
          </CardContent>
        </Card>
      ) : (
        // Se houver aniversariantes
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aniversariantesDoMes.map((usuario, index) => {
            const ehHoje = isAniversarioHoje(usuario.data_nascimento);
            const dataNascimento = parseDateAsLocal(usuario.data_nascimento);
            
            return (
              <motion.div
                key={usuario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={`backdrop-blur-md border-white/10 ${
                  ehHoje 
                    ? "bg-gradient-to-br from-[#D4AF37]/30 to-[#B8941E]/20 border-[#D4AF37]/50" 
                    : "bg-white/5"
                } hover:scale-105 transition-transform duration-300`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                        ehHoje 
                          ? "bg-[#D4AF37] text-[#001B3D]" 
                          : "bg-white/10 text-white"
                      }`}>
                        {usuario.full_name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {usuario.full_name}
                          </h3>
                          {ehHoje && (
                            <Badge className="bg-[#D4AF37] text-[#001B3D] border-0">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Hoje!
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Cake className="w-4 h-4" />
                          <span className="text-sm">
                            {format(dataNascimento, "d 'de' MMMM", { locale: ptBR })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {ehHoje && (
                      <div className="mt-4 p-3 bg-white/10 rounded-lg text-center">
                        <p className="text-sm text-white italic">
                          🎉 Feliz Aniversário! Que Deus abençoe seu novo ano de vida! 🎉
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}