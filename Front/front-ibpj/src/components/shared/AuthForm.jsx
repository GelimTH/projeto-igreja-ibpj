import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/entities/User';
import { LogIn, Eye, EyeOff, UserPlus } from 'lucide-react';
import { SheetTitle } from '@/components/ui/sheet';
import { Switch } from "@/components/ui/switch"; // 1. Importar o Switch

export default function AuthForm({ onLoginSuccess }) {
  const [view, setView] = useState('login'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState(''); 
  
  // 2. Novo estado para o Switch (padrão 'true' = aparecer)
  const [showAniversario, setShowAniversario] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await User.login(email, password);
      onLoginSuccess();
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);
    try {
      // 3. Enviar o novo estado para a API
      await User.register({
        email,
        password,
        full_name: fullName,
        data_nascimento: birthDate,
        show_in_aniversariantes: showAniversario // <--- NOVO CAMPO
      });
      setMessage('Usuário registrado com sucesso! Você já pode fazer o login.');
      setView('login');
    } catch (err) {
      setError(err.message || 'Erro ao registrar. O email já pode estar em uso.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchView = (newView) => {
    setView(newView);
    setError(null);
    setMessage(null);
    setEmail('');
    setPassword('');
    setFullName('');
    setBirthDate('');
    setShowPassword(false);
    setShowAniversario(true); // Reseta o switch
  };

  return (
    // 4. CORREÇÃO DE LAYOUT: 
    // Remover 'h-full' e 'justify-center' daqui. Deixe o Layout.jsx cuidar disso.
    <div className="flex flex-col"> 
      
      <SheetTitle className="text-2xl font-bold text-white mb-8 text-center">
        {view === 'login' ? 'Login' : 'Registrar Nova Conta'}
      </SheetTitle>

      {view === 'login' ? (
        // --- FORMULÁRIO DE LOGIN (Inalterado) ---
        <form onSubmit={handleLogin} className="space-y-6">
          {/* ... (Inputs de Email e Senha com estilos corretos) ... */}
           <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">Email</Label>
            <Input
              id="email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required
              placeholder="admin@ibpj.com"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/80">Senha</Label>
            <div className="relative">
              <Input
                id="password" type={showPassword ? 'text' : 'password'}
                value={password} onChange={(e) => setPassword(e.target.value)} required
                placeholder="Sua senha"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-10"
              />
              <Button
                type="button" variant="ghost" size="icon"
                className="absolute top-0 right-0 h-full px-3 text-muted-foreground hover:text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          {message && <p className="text-sm text-green-400">{message}</p>}
          <Button type="submit" className="w-full bg-[#D4AF37] text-[#001B3D] hover:bg-[#D4AF37]/90" disabled={isLoading}>
            {isLoading ? 'Entrando...' : <><LogIn className="w-4 h-4 mr-2" /> Entrar</>}
          </Button>
          <div className="text-center">
            <Button variant="link" type="button" onClick={() => switchView('register')} className="text-white/70 hover:text-primary">
              Não tem uma conta? Registre-se
            </Button>
          </div>
        </form>

      ) : (
        // --- FORMULÁRIO DE REGISTRO (Com Switch) ---
        <form onSubmit={handleRegister} className="space-y-4">
          {/* ... (Inputs de Nome, Email, Data de Nascimento, Senha) ... */}
          <div className="space-y-2">
            <Label htmlFor="reg_fullname" className="text-white/80">Nome Completo</Label>
            <Input id="reg_fullname" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="bg-white/10 border-white/20 text-white placeholder:text-white/40"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg_email" className="text-white/80">Email</Label>
            <Input id="reg_email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white/10 border-white/20 text-white placeholder:text-white/40"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg_birthdate" className="text-white/80">Data de Nascimento</Label>
            <Input id="reg_birthdate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required className="bg-white/10 border-white/20 text-white"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg_password" className="text-white/80">Senha</Label>
            <div className="relative">
              <Input id="reg_password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-10"/>
              <Button type="button" variant="ghost" size="icon" className="absolute top-0 right-0 h-full px-3 text-muted-foreground hover:text-primary" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          {/* 5. NOVO COMPONENTE SWITCH */}
          <div className="flex items-center justify-between space-x-2 bg-white/10 border border-white/20 p-4 rounded-lg">
            <Label htmlFor="show-aniversario" className="text-white/80">
              Exibir no mural de aniversariantes?
            </Label>
            <Switch
              id="show-aniversario"
              checked={showAniversario}
              onCheckedChange={setShowAniversario}
              className="data-[state=checked]:bg-[#D4AF37] data-[state=unchecked]:bg-white/20"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button type="submit" className="w-full bg-[#D4AF37] text-[#001B3D] hover:bg-[#D4AF37]/90" disabled={isLoading}>
            {isLoading ? 'Registrando...' : <><UserPlus className="w-4 h-4 mr-2" /> Registrar</>}
          </Button>

          <div className="text-center">
            <Button variant="link" type="button" onClick={() => switchView('login')} className="text-white/70 hover:text-primary">
              Já tem uma conta? Faça login
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}