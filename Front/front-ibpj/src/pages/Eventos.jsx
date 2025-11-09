import React, { useState, useEffect } from "react";
import { Evento } from "@/entities/Evento";
import { User } from "@/entities/User";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar as CalendarIcon, Clock, MapPin, Tag } from "lucide-react";
import { format, isSameDay, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";

import EventoForm from "../components/eventos/EventoForm";
import EventoCard from "../components/eventos/EventoCard";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editingEvento, setEditingEvento] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const safeSelectedDate = selectedDate || new Date();

  useEffect(() => {
    loadUser();
    loadEventos();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      console.log("User not logged in");
    }
  };

  const loadEventos = async () => {
    setIsLoading(true);
    const data = await Evento.list("-data");
    setEventos(data);
    setIsLoading(false);
  };

  const handleSubmit = async (eventoData) => {
    if (editingEvento) {
      await Evento.update(editingEvento.id, eventoData);
    } else {
      await Evento.create(eventoData);
    }
    setShowForm(false);
    setEditingEvento(null);
    loadEventos();
  };

  const handleEdit = (evento) => {
    setEditingEvento(evento);
    setShowForm(true);
  };

  const handleDelete = async (eventoId) => {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
      await Evento.delete(eventoId);
      loadEventos();
    }
  };

  const eventosDoMes = eventos.filter(evento => {
    const eventoDate = new Date(evento.data);
    const start = startOfMonth(safeSelectedDate);
    const end = endOfMonth(safeSelectedDate);
    return eventoDate >= start && eventoDate <= end;
  });

  const eventosDoDia = eventos.filter(evento => 
    isSameDay(new Date(evento.data), safeSelectedDate)
  );

  const isAdmin = user?.role === 'admin';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Eventos</h1>
          <p className="text-white/70">Confira a agenda da igreja</p>
        </div>
        
        {isAdmin && (
          <Button
            onClick={() => {
              setEditingEvento(null);
              setShowForm(true);
            }}
            className="bg-[#D4AF37] hover:bg-[#B8941E] text-[#001B3D]"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Evento
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <EventoForm
            evento={editingEvento}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingEvento(null);
            }}
          />
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1 bg-white/5 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
              Calendário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={ptBR}
              className="rounded-md border-0"
              classNames={{
                months: "text-white",
                month: "space-y-4",
                caption: "text-white flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium text-white",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-white/10 hover:bg-white/20 text-white p-0 opacity-100",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-white/70 rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[#D4AF37]/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal text-white hover:bg-white/10 rounded-md",
                
                /* Esta linha aplica o estilo Dourado/Azul ao dia selecionado */
                day_selected: "bg-[#D4AF37] text-[#001B3D] hover:bg-[#D4AF37] hover:text-[#001B3D]",
                
                /* Esta linha é o que você está vendo (o dia de hoje) */
                day_today: "bg-white/20 text-white", 
                
                day_outside: "text-white/30",
                day_disabled: "text-white/30",
                day_hidden: "invisible",
              }}
            />
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white">
                Eventos de {format(safeSelectedDate, "d 'de' MMMM", { locale: ptBR })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {eventosDoDia.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarIcon className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/50">Nenhum evento agendado para este dia</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {eventosDoDia.map((evento) => (
                      <EventoCard
                        key={evento.id}
                        evento={evento}
                        isAdmin={isAdmin}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white">
                Todos os eventos de {format(safeSelectedDate, "MMMM", { locale: ptBR })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {eventosDoMes.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarIcon className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/50">Nenhum evento este mês</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {eventosDoMes.map((evento) => (
                    <EventoCard
                      key={evento.id}
                      evento={evento}
                      isAdmin={isAdmin}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}