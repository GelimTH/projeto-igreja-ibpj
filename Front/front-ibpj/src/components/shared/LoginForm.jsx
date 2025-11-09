import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/entities/User';
// 1. Importar os ícones de Olho (Eye) e LogIn
import { LogIn, Eye, EyeOff } from 'lucide-react';

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // 2. Novo estado para controlar a visibilidade da senha
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await User.login(email, password);
      onLoginSuccess();
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@ibpj.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* 3. Bloco da Senha (Modificado) */}
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        
        {/* Container Relativo para posicionar o ícone */}
        <div className="relative">
          <Input
            id="password"
            // Define o tipo dinamicamente (text ou password)
            type={showPassword ? 'text' : 'password'}
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            // Adiciona padding à direita para o texto não ficar atrás do ícone
            className="pr-10" 
          />
          
          {/* Botão do Ícone */}
          <Button
            type="button" // Impede o submit do formulário
            variant="ghost"
            size="icon"
            // Posiciona o botão absolutamente dentro do input
            className="absolute top-0 right-0 h-full px-3 text-muted-foreground hover:text-primary"
            onClick={() => setShowPassword(!showPassword)} // Alterna o estado
          >
            {/* Alterna o ícone baseado no estado */}
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {/* Botão de Login (Inalterado) */}
      <Button 
        type="submit" 
        className="w-full bg-[#D4AF37] text-[#001B3D] hover:bg-[#D4AF37]/90"
        disabled={isLoading}
      >
        {isLoading ? (
          'Entrando...'
        ) : (
          <>
            <LogIn className="w-4 h-4 mr-2" />
            Entrar
          </>
        )}
      </Button>
    </form>
  );
}