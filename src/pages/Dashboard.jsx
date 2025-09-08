import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { LayoutDashboard, Fish, DollarSign, PlusCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { fishTypes } from '@/data/locations';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('marketPrice');
  const [marketPriceData, setMarketPriceData] = useState({ fishType: '', price: '' });
  const [stockData, setStockData] = useState({ fishType: '', size: '', quantity: '' });
  const [accountData, setAccountData] = useState({ type: 'income', category: '', amount: '', description: '' });

  const handleToast = (feature) => {
    toast({
      title: `📦 ${feature}`,
      description: "🚧 এই ফিচারটি এখনও বাস্তবায়িত হয়নি—কিন্তু চিন্তা নেই! আপনি আপনার পরবর্তী প্রম্পটে এটি অনুরোধ করতে পারেন! 🚀"
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'marketPrice':
        return <MarketPriceUpdate />;
      case 'stockManagement':
        return <StockManagement />;
      case 'accounts':
        return <PondAccounts />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="text-white text-center py-20">লোড হচ্ছে...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Helmet>
        <title>ড্যাশবোর্ড - Fish Care BD</title>
        <meta name="description" content="আপনার ড্যাশবোর্ড থেকে মাছের বাজার দর, স্টক এবং আয়-ব্যয় পরিচালনা করুন।" />
      </Helmet>

      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">ড্যাশবোর্ড</h1>
            <p className="text-xl text-white/80">স্বাগতম, {user.username}!</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar / Tabs for mobile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-1"
            >
              <Card className="glass-effect border-white/20">
                <CardContent className="p-4">
                  <nav className="flex md:flex-col gap-2">
                    <Button 
                      variant={activeTab === 'marketPrice' ? 'default' : 'ghost'} 
                      onClick={() => setActiveTab('marketPrice')} 
                      className={`w-full justify-start ${activeTab === 'marketPrice' ? 'btn-primary' : 'text-white hover:bg-white/10'}`}
                    >
                      <DollarSign className="w-4 h-4 mr-2" /> বাজার দর আপডেট
                    </Button>
                    {user.user_type === 'farmer' && (
                      <>
                        <Button 
                          variant={activeTab === 'stockManagement' ? 'default' : 'ghost'} 
                          onClick={() => setActiveTab('stockManagement')} 
                          className={`w-full justify-start ${activeTab === 'stockManagement' ? 'btn-primary' : 'text-white hover:bg-white/10'}`}
                        >
                          <Fish className="w-4 h-4 mr-2" /> স্টক ম্যানেজমেন্ট
                        </Button>
                        <Button 
                          variant={activeTab === 'accounts' ? 'default' : 'ghost'} 
                          onClick={() => setActiveTab('accounts')} 
                          className={`w-full justify-start ${activeTab === 'accounts' ? 'btn-primary' : 'text-white hover:bg-white/10'}`}
                        >
                          <LayoutDashboard className="w-4 h-4 mr-2" /> আয়-ব্যয় হিসাব
                        </Button>
                      </>
                    )}
                  </nav>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-span-3"
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

const MarketPriceUpdate = () => {
  const { toast } = useToast();
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "📈 বাজার দর",
      description: "🚧 এই ফিচারটি এখনও বাস্তবায়িত হয়নি—কিন্তু চিন্তা নেই! আপনি আপনার পরবর্তী প্রম্পটে এটি অনুরোধ করতে পারেন! 🚀"
    });
  };
  return (
    <Card className="glass-effect border-white/20">
      <CardHeader><CardTitle className="text-white">বাজার দর আপডেট করুন</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select><SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="মাছের ধরন নির্বাচন করুন" /></SelectTrigger><SelectContent>{fishTypes.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent></Select>
          <Input type="number" placeholder="দাম প্রতি কেজি (৳)" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
          <Button type="submit" className="btn-primary">আপডেট</Button>
        </form>
      </CardContent>
    </Card>
  );
};

const StockManagement = () => {
  const { toast } = useToast();
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🐟 স্টক",
      description: "🚧 এই ফিচারটি এখনও বাস্তবায়িত হয়নি—কিন্তু চিন্তা নেই! আপনি আপনার পরবর্তী প্রম্পটে এটি অনুরোধ করতে পারেন! 🚀"
    });
  };
  return (
    <Card className="glass-effect border-white/20">
      <CardHeader><CardTitle className="text-white">স্টক ম্যানেজমেন্ট</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select><SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="মাছের ধরন নির্বাচন করুন" /></SelectTrigger><SelectContent>{fishTypes.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent></Select>
          <Select><SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="সাইজ নির্বাচন করুন" /></SelectTrigger><SelectContent><SelectItem value="small">ছোট</SelectItem><SelectItem value="medium">মাঝারি</SelectItem><SelectItem value="large">বড়</SelectItem></SelectContent></Select>
          <Input type="number" placeholder="পরিমাণ (কেজি)" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
          <Button type="submit" className="btn-primary">স্টক যোগ করুন</Button>
        </form>
      </CardContent>
    </Card>
  );
};

const PondAccounts = () => {
  const { toast } = useToast();
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "💰 হিসাব",
      description: "🚧 এই ফিচারটি এখনও বাস্তবায়িত হয়নি—কিন্তু চিন্তা নেই! আপনি আপনার পরবর্তী প্রম্পটে এটি অনুরোধ করতে পারেন! 🚀"
    });
  };
  return (
    <Card className="glass-effect border-white/20">
      <CardHeader><CardTitle className="text-white">পুকুরের আয়-ব্যয় হিসাব</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select><SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="লেনদেনের ধরন" /></SelectTrigger><SelectContent><SelectItem value="income">আয়</SelectItem><SelectItem value="expense">ব্যয়</SelectItem></SelectContent></Select>
          <Input placeholder="ক্যাটাগরি" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
          <Input type="number" placeholder="পরিমাণ (৳)" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
          <Input placeholder="বিবরণ" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
          <Button type="submit" className="btn-primary">হিসাব যোগ করুন</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Dashboard;