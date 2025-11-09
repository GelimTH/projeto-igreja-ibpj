import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/entities/User';
import { Evento } from '@/entities/Evento';
import { Postagem } from '@/entities/Postagem';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Edit, MoveRight, UserCog, ShieldAlert, Info } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function DebugPanel({ closePanel }) {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const [deleteAlert, setDeleteAlert] = useState({
    isOpen: false,
    type: null,
    id: null,
  });

  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    message: '',
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setUsers(await User.listAll());
      setEvents(await Evento.list());
      setPosts(await Postagem.list());
    } catch (error) {
      console.error("Falha ao carregar dados do debug:", error);
    }
  };
  
  const handleNavigate = (path) => {
    navigate(path);
    closePanel();
  };

  const handleDelete = (type, id) => {
    setDeleteAlert({ isOpen: true, type, id });
  };

  const confirmDelete = async () => {
    const { type, id } = deleteAlert;
    
    try {
      if (type === 'user') await User.deleteUser(id);
      if (type === 'evento') await Evento.delete(id);
      if (type === 'postagem') await Postagem.delete(id);
      
      setInfoModal({ isOpen: true, message: `${type} deletado com sucesso.` });
      loadAllData();
    } catch (error) {
      setInfoModal({ isOpen: true, message: `Falha ao deletar ${type}.` });
    } finally {
      setDeleteAlert({ isOpen: false, type: null, id: null });
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await User.updateRole(userId, newRole);
      setInfoModal({ isOpen: true, message: 'Role atualizada!' });
      loadAllData();
    } catch (error) {
      setInfoModal({ isOpen: true, message: 'Falha ao atualizar role.' });
    }
  };
  
  const handleEdit = (type, id) => {
    if (type === 'evento') navigate(`/eventos?edit=${id}`);
    if (type === 'postagem') navigate(`/programacao?edit=${id}`);
    closePanel();
  };

  return (
    <div className="text-white">
      <Tabs defaultValue="navegacao">
        <TabsList className="grid w-full grid-cols-3 bg-white/10">
          <TabsTrigger value="navegacao">Navegar</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
        </TabsList>
        
        {/* --- ABA DE NAVEGAÇÃO --- */}
        <TabsContent value="navegacao">
          <div className="flex flex-col gap-2">
            <Button variant="outline" onClick={() => handleNavigate('/')}>Home</Button>
            <Button variant="outline" onClick={() => handleNavigate('/eventos')}>Eventos</Button>
            <Button variant="outline" onClick={() => handleNavigate('/programacao')}>Programação</Button>
            <Button variant="outline" onClick={() => handleNavigate('/aniversariantes')}>Aniversariantes</Button>
          </div>
        </TabsContent>

        {/* --- ABA DE USUÁRIOS --- */}
        <TabsContent value="usuarios">
          <ScrollArea className="h-72">
            <div className="space-y-4 pr-4">
              {users.map(user => (
                <div key={user.id} className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <div>
                    <p className="font-semibold">{user.full_name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <Select value={user.role} onValueChange={(role) => handleRoleChange(user.id, role)}>
                      <SelectTrigger className="w-32 bg-white/10 border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#001B3D] border-white/20">
                        <SelectItem value="DESENVOLVEDOR">DEV</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Membro</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete('user', user.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* --- ABA DE CONTEÚDO (Eventos/Postagens) --- */}
        <TabsContent value="conteudo">
          <ScrollArea className="h-72">
            <div className="space-y-4 pr-4">
              <h3 className="font-bold text-lg text-primary">Eventos</h3>
              {events.map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <p>{item.titulo}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit('evento', item.id)}><Edit className="w-4 h-4" /></Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete('evento', item.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}
              <h3 className="font-bold text-lg text-primary mt-4">Programações</h3>
              {posts.map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <p>{item.titulo}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit('postagem', item.id)}><Edit className="w-4 h-4" /></Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete('postagem', item.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* --- MODAIS --- */}

      {/* Modal de Confirmação (AlertDialog) */}
      <AlertDialog open={deleteAlert.isOpen} onOpenChange={(isOpen) => setDeleteAlert({ ...deleteAlert, isOpen })}>
        <AlertDialogContent className="bg-[#001B3D]/80 backdrop-blur-md border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              Você tem certeza?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              {`Tem certeza que deseja DELETAR este ${deleteAlert.type}? Esta ação não pode ser desfeita.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-transparent border-white/20 hover:bg-white/10"
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-red-600 text-white hover:bg-red-700"
            >
              OK, Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal de Informação (Dialog) */}
      <Dialog open={infoModal.isOpen} onOpenChange={(isOpen) => setInfoModal({ ...infoModal, isOpen })}>
        <DialogContent className="bg-[#001B3D]/80 backdrop-blur-md border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-primary flex items-center gap-2">
              <Info className="w-5 h-5" />
              Aviso
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

    </div>
  );
}