import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { divisions, districts, upazilas } from '@/data/locations';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: '',
    division: '',
    district: '',
    upazila: '',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const availableDistricts = formData.division ? districts[formData.division] || [] : [];
  const availableUpazilas = formData.district ? upazilas[formData.district] || [] : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'division' && { district: '', upazila: '' }),
      ...(name === 'district' && { upazila: '' }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { username, password, userType, upazila } = formData;
    if (!username || !password || !userType || !upazila) {
      toast({
        title: "❌ ভুল",
        description: "অনুগ্রহ করে সকল তথ্য পূরণ করুন",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const { success, error } = await register({
        username,
        password,
        user_type: userType,
        upazila_id: upazila,
      });

      if (success) {
        toast({
          title: "✅ সফল",
          description: "রেজিস্ট্রেশন সফল হয়েছে। আপনাকে ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "❌ রেজিস্ট্রেশন ব্যর্থ",
          description: error || "রেজিস্ট্রেশন করা যায়নি। আবার চেষ্টা করুন।",
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
        <title>রেজিস্টার - Fish Care BD</title>
        <meta name="description" content="Fish Care BD তে একটি নতুন অ্যাকাউন্ট তৈরি করুন।" />
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
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white text-3xl">রেজিস্টার করুন</CardTitle>
              <CardDescription className="text-white/80">
                একটি নতুন অ্যাকাউন্ট তৈরি করুন
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">ইউজারনেম</label>
                  <Input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="আপনার ইউজারনেম" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">পাসওয়ার্ড</label>
                  <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="আপনার পাসওয়ার্ড" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">ইউজার টাইপ</label>
                  <Select name="userType" value={formData.userType} onValueChange={(value) => handleSelectChange('userType', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="নির্বাচন করুন" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farmer">চাষী</SelectItem>
                      <SelectItem value="seller">বিক্রেতা</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">বিভাগ</label>
                  <Select name="division" value={formData.division} onValueChange={(value) => handleSelectChange('division', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="বিভাগ নির্বাচন করুন" /></SelectTrigger>
                    <SelectContent>{divisions.map(d => <SelectItem key={d.id} value={d.id.toString()}>{d.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">জেলা</label>
                  <Select name="district" value={formData.district} onValueChange={(value) => handleSelectChange('district', value)} disabled={!formData.division}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="জেলা নির্বাচন করুন" /></SelectTrigger>
                    <SelectContent>{availableDistricts.map(d => <SelectItem key={d.id} value={d.id.toString()}>{d.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">উপজেলা</label>
                  <Select name="upazila" value={formData.upazila} onValueChange={(value) => handleSelectChange('upazila', value)} disabled={!formData.district}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="উপজেলা নির্বাচন করুন" /></SelectTrigger>
                    <SelectContent>{availableUpazilas.map(u => <SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Button type="submit" disabled={loading} className="w-full btn-primary">
                    {loading ? 'অপেক্ষা করুন...' : 'রেজিস্টার'}
                  </Button>
                </div>
              </form>

              <p className="mt-6 text-center text-sm text-white/80">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                <Link to="/login" className="font-medium text-blue-300 hover:text-blue-400">
                  লগইন করুন
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default Register;