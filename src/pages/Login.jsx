import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { LogIn, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !password) {
      toast({
        title: "❌ ভুল",
        description: "অনুগ্রহ করে ইউজারনেম এবং পাসওয়ার্ড দিন",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const { success, error } = await login(username, password);

      if (success) {
        toast({
          title: "✅ সফল",
          description: "লগইন সফল হয়েছে। আপনাকে ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "❌ লগইন ব্যর্থ",
          description: error || "ভুল ইউজারনেম বা পাসওয়ার্ড",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "❌ ত্রুটি",
        description: "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>লগইন - Fish Care BD</title>
        <meta name="description" content="Fish Care BD তে আপনার অ্যাকাউন্টে লগইন করুন।" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8"
        >
          <Card className="glass-effect border-white/20">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white text-3xl">লগইন করুন</CardTitle>
              <CardDescription className="text-white/80">
                আপনার অ্যাকাউন্টে প্রবেশ করুন
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    ইউজারনেম
                  </label>
                  <Input
                    type="text"
                    placeholder="আপনার ইউজারনেম"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    পাসওয়ার্ড
                  </label>
                  <Input
                    type="password"
                    placeholder="আপনার পাসওয়ার্ড"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div>
                  <Button type="submit" disabled={loading} className="w-full btn-primary">
                    {loading ? (
                      <>
                        <LogIn className="w-4 h-4 mr-2 animate-spin" />
                        অপেক্ষা করুন...
                      </>
                    ) : 'লগইন'}
                  </Button>
                </div>
              </form>

              <p className="mt-6 text-center text-sm text-white/80">
                অ্যাকাউন্ট নেই?{' '}
                <Link to="/register" className="font-medium text-blue-300 hover:text-blue-400">
                  রেজিস্টার করুন
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default Login;