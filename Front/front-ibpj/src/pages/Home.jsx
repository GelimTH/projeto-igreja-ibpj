
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar, Heart, Book, MapPin, 
  ArrowRight, Sparkles, Users, Church
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const quickLinks = [
    {
      title: "Eventos",
      description: "Confira nossa agenda",
      icon: Calendar,
      url: createPageUrl("Eventos"),
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Generosidade",
      description: "Contribua conosco",
      icon: Heart,
      url: createPageUrl("Generosidade"),
      color: "from-rose-500 to-rose-600"
    },
    {
      title: "Princípios",
      description: "Nossa base de fé",
      icon: Book,
      url: createPageUrl("Principios"),
      color: "from-amber-500 to-amber-600"
    },
    {
      title: "Contato",
      description: "Fale conosco",
      icon: MapPin,
      url: createPageUrl("Contato"),
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 rounded-full px-6 py-2 mb-6">
          <Church className="w-4 h-4 text-[#D4AF37]" /> {/* Updated from Sparkles to Church */}
          <span className="text-[#D4AF37] text-sm font-medium">Bem-vindo à família IBPJ</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Igreja Batista<br />
          <span className="text-[#D4AF37]">Parque Jandaia</span>
        </h1>
        
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Uma comunidade de fé, amor e adoração a Deus
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={createPageUrl("QuemSomos")}>
            <Button 
              size="lg" 
              className="bg-[#D4AF37] hover:bg-[#B8941E] text-[#001B3D] font-semibold px-8"
            >
              Conheça-nos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to={createPageUrl("Eventos")}>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 px-8"
            >
              Ver Eventos
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Culto Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-8 text-center">
          <Church className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Horário de Culto</h2>
          <p className="text-white/70 text-lg mb-4">
            Todos os dias das <span className="text-[#D4AF37] font-semibold">18h00 às 20h00</span>
          </p>
          <p className="text-white/60">
            Venha nos visitar e faça parte desta família!
          </p>
        </Card>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Acesso Rápido
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <Link to={link.url}>
                <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group h-full">
                  <div className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{link.title}</h3>
                  <p className="text-white/70">{link.description}</p>
                  <ArrowRight className="w-5 h-5 text-[#D4AF37] mt-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Verse Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16"
      >
        <Card className="bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941E]/10 backdrop-blur-md border-[#D4AF37]/30 p-8 text-center">
          <Book className="w-10 h-10 text-[#D4AF37] mx-auto mb-4" />
          <p className="text-xl md:text-2xl text-white italic mb-4 leading-relaxed">
            "Porque onde estiverem dois ou três reunidos em meu nome,<br />
            ali estou eu no meio deles."
          </p>
          <p className="text-[#D4AF37] font-semibold">Mateus 18:20</p>
        </Card>
      </motion.div>
    </div>
  );
}
