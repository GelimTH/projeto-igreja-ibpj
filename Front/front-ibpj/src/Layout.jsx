import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Home, Calendar, Cake, FileText, Heart, Book,
  MapPin, Users, Menu, X, LogOut, Church,
  LogIn, Bug 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/entities/User";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthForm from "@/components/shared/AuthForm";
import DebugPanel from "@/components/debug/DebugPanel";

const navigationItems = [
  { title: "Início", url: createPageUrl("Home"), icon: Home },
  { title: "Eventos", url: createPageUrl("Eventos"), icon: Calendar },
  { title: "Aniversariantes", url: createPageUrl("Aniversariantes"), icon: Cake },
  { title: "Programação", url: createPageUrl("Programacao"), icon: FileText },
  { title: "Generosidade", url: createPageUrl("Generosidade"), icon: Heart },
  { title: "Princípios", url: createPageUrl("Principios"), icon: Book },
  { title: "Contato", url: createPageUrl("Contato"), icon: MapPin },
  { title: "Quem Somos", url: createPageUrl("QuemSomos"), icon: Users },
];

export default function Layout() {
  const location = useLocation();
  const [user, setUser] = React.useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isDebugOpen, setIsDebugOpen] = React.useState(false);

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      console.log("Usuário não logado");
    }
  };

  const handleLogout = async () => {
    await User.logout();
    window.location.reload();
  };

  // Função para recarregar a página após o login
  const handleLoginSuccess = () => {
    setIsLoginOpen(false); // Fecha o sheet
    window.location.reload(); // Recarrega a página para o User.me() buscar o admin
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001B3D] via-[#002855] to-[#001B3D]">
      <style>{`
        :root {
          --primary: #001B3D;
          --secondary: #D4AF37;
          --accent: #4A90E2;
        }
      `}</style>

      {/* Header (z-index 40) */}
      <header className="bg-[#001B3D]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">

            {/* Logo IBPJ */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941E] rounded-full flex items-center justify-center shadow-lg">
                <Church className="w-6 h-6 text-[#001B3D]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">IBPJ</h1>
                <p className="text-xs text-white/70">Igreja Batista Parque Jandaia</p>
              </div>
            </div>

            {/* Navegação Desktop */}
            <nav className="hidden lg:flex items-center gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${location.pathname === item.url
                    ? "bg-[#D4AF37] text-[#001B3D] font-semibold"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.title}</span>
                </Link>
              ))}
            </nav>

            {/* --- User Menu (MODIFICADO) --- */}
            {/* Este container agora SÓ mostra o avatar (se logado) ou o menu mobile */}
            <div className="flex items-center gap-3">

              {/* 1. SE ESTIVER LOGADO: Mostra o avatar no header */}
              {user && (
                <div className="hidden md:flex items-center gap-3 bg-white/10 rounded-full px-4 py-2">
                  <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-[#001B3D]">
                      {user.full_name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm">
                    <p className="text-white font-medium">{user.full_name}</p>
                    <p className="text-white/60 text-xs">{user.role === 'admin' ? 'Administrador' : 'Membro'}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="text-white hover:bg-white/20"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Mobile Menu (Inalterado) */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden text-white">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#001B3D]/80 backdrop-blur-md border-l border-white/10 w-72">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-lg font-bold text-white">Menu</h2>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="text-white">
                          <X className="w-5 h-5" />
                        </Button>
                      </SheetClose>
                    </div>

                    {user && (
                      <div className="mb-6 p-4 bg-white/10 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold text-[#001B3D]">
                              {user.full_name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{user.full_name}</p>
                            <p className="text-white/60 text-sm">
                              {user.role === 'admin' ? 'Administrador' : 'Membro'}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sair
                        </Button>
                      </div>
                    )}

                    <nav className="flex-1 space-y-2">
                      {navigationItems.map((item) => (
                        <SheetClose asChild key={item.title}>
                          <Link
                            to={item.url}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${location.pathname === item.url
                              ? "bg-[#D4AF37] text-[#001B3D] font-semibold"
                              : "text-white/80 hover:bg-white/10"
                              }`}
                          >
                            <item.icon className="w-5 h-5" />
                            <span>{item.title}</span>
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* --- BOTÃO DE LOGIN FLUTUANTE (Fora do Header) --- */}
      {/* 2. SE ESTIVER DESLOGADO: Mostra o botão flutuante */}
      {!user && (
        <Sheet open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <SheetTrigger asChild>
            <Button
              className="hidden lg:flex group fixed top-5 right-5 z-50 
                         h-12 p-0 rounded-full
                         
                         /* Cores explícitas (Dourado/Azul) */
                         bg-[#D4AF37] text-[#001B3D] 
                         hover:bg-[#D4AF37]/90
                         
                         focus:outline-none overflow-hidden 
                         whitespace-nowrap 
                         transition-all duration-300 ease-in-out
                         
                         /* Animação de largura (ajustada para w-28) */
                         w-12 hover:w-28"
            >
              {/* Container interno para alinhar o conteúdo */}
              <div className="flex items-center justify-end w-full pr-3.5">

                {/* Texto (Aparece no hover) */}
                <span
                  className="text-sm font-medium 
                             opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
                             transition-all duration-300 delay-100"
                >
                  Entrar
                </span>

                {/* Ícone (Sempre visível) */}
                <LogIn className="w-5 h-5 flex-shrink-0 ml-2" />
              </div>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-[#001B3D]/80 backdrop-blur-md border-l border-white/10 w-80 z-50"
          >
            <div className="flex flex-col h-full justify-center">

              <AuthForm onLoginSuccess={handleLoginSuccess} />

            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* --- NOVO: BOTÃO DE DEBUG FLUTUANTE --- */}
      {/* 5. Renderiza o botão SÓ SE for DEV */}
      {user?.role === 'DESENVOLVEDOR' && (
        <Dialog open={isDebugOpen} onOpenChange={setIsDebugOpen}>
          <DialogTrigger asChild>
            <Button
              className="fixed bottom-5 right-5 z-50 
                         h-16 w-16 rounded-full 
                         bg-[#D4AF37] text-[#001B3D] 
                         hover:bg-[#D4AF37]/90
                         shadow-lg
                         transition-all duration-300 ease-in-out
                         hover:scale-110"
            >
              <Bug className="w-8 h-8" />
            </Button>
          </DialogTrigger>
          <DialogContent
            className="bg-[#001B3D]/80 backdrop-blur-md border-white/10 text-white max-w-2xl"
          >
            <DialogTitle className="text-2xl font-bold text-primary mb-4">
              Painel de Desenvolvedor
            </DialogTitle>
            <DebugPanel closePanel={() => setIsDebugOpen(false)} />
          </DialogContent>
        </Dialog>
      )}

      {/* Main Content (Onde as páginas são renderizadas) */}
      <main className="min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#001B3D]/50 backdrop-blur-md border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Church className="w-6 h-6 text-[#D4AF37]" />
              <h3 className="text-xl font-bold text-white">IBPJ</h3>
            </div>
            <p className="text-white/70 mb-2">
              Igreja Batista Parque Jandaia
            </p>
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} IBPJ - Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}