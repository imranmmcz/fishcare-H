import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Send, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: "❌ ভুল",
        description: "অনুগ্রহ করে নাম, মোবাইল এবং বার্তা পূরণ করুন।",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "📤 বার্তা পাঠানো হয়েছে",
      description: "আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
    });
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <>
      <Helmet>
        <title>যোগাযোগ - Fish Care BD</title>
        <meta name="description" content="যেকোনো প্রশ্ন বা সহায়তার জন্য Fish Care BD-এর সাথে যোগাযোগ করুন।" />
      </Helmet>

      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">আমাদের সাথে যোগাযোগ করুন</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              আপনার প্রশ্ন, মতামত বা পরামর্শ আমাদের জানান। আমরা সাহায্য করতে প্রস্তুত।
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glass-effect border-white/20 h-full">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center">
                    <Send className="w-6 h-6 mr-3" />
                    আপনার বার্তা পাঠান
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">নাম</label>
                      <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="আপনার নাম" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" required />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">মোবাইল</label>
                      <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="আপনার মোবাইল নম্বর" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" required />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">ইমেইল (ঐচ্ছিক)</label>
                      <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="আপনার ইমেইল" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">বার্তা/প্রশ্ন</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} placeholder="আপনার বার্তা লিখুন" className="w-full h-32 p-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-md" required />
                    </div>
                    <Button type="submit" className="btn-primary w-full">
                      <Send className="w-4 h-4 mr-2" />
                      বার্তা পাঠান
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">যোগাযোগের তথ্য</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-white/90">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-cyan-300" />
                    <span>support@fishcare.com.bd</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-cyan-300" />
                    <span>01978865277</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-cyan-300" />
                    <span>রবি–বৃহস্পতি, সকাল ৯টা – সন্ধ্যা ৬টা</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">আমাদের খুঁজুন</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.openstreetmap.org/export/embed.html?bbox=90.3929,23.743,90.4129,23.763&layer=mapnik&marker=23.753,90.4029"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="map"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;