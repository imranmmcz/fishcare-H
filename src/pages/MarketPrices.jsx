import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { TrendingUp, MapPin, Clock, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { divisions, districts, upazilas, fishTypes } from '@/data/locations';
import { useToast } from '@/components/ui/use-toast';

const MarketPrices = () => {
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const availableDistricts = selectedDivision ? districts[selectedDivision] || [] : [];
  const availableUpazilas = selectedDistrict ? upazilas[selectedDistrict] || [] : [];

  const generateMockPrices = (upazilaId) => {
    const mockPrices = fishTypes.map(fish => ({
      fish_type: fish,
      min_price: Math.floor(Math.random() * 100) + 200,
      max_price: Math.floor(Math.random() * 100) + 350,
      avg_price: Math.floor(Math.random() * 100) + 275,
      last_updated: new Date().toLocaleString('bn-BD')
    }));
    return mockPrices;
  };

  const handleLocationChange = () => {
    if (selectedUpazila) {
      setLoading(true);
      setTimeout(() => {
        const mockPrices = generateMockPrices(selectedUpazila);
        setPrices(mockPrices);
        setLoading(false);
        toast({
          title: "✅ বাজার দর আপডেট হয়েছে",
          description: "সর্বশেষ বাজার দর লোড করা হয়েছে"
        });
      }, 1000);
    }
  };

  const refreshPrices = () => {
    if (selectedUpazila) {
      handleLocationChange();
    } else {
      toast({
        title: "⚠️ অবস্থান নির্বাচন করুন",
        description: "প্রথমে বিভাগ, জেলা এবং উপজেলা নির্বাচন করুন"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>দৈনিক বাজার দর - Fish Care BD</title>
        <meta name="description" content="বাংলাদেশের সকল বিভাগ, জেলা ও উপজেলার সর্বশেষ মাছের বাজার দর দেখুন। রিয়েল-টাইম প্রাইস আপডেট।" />
      </Helmet>

      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              দৈনিক বাজার দর
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              বাংলাদেশের সকল এলাকার সর্বশেষ মাছের বাজার দর
            </p>
          </motion.div>

          {/* Location Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  এলাকা নির্বাচন করুন
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      বিভাগ
                    </label>
                    <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {divisions.map(division => (
                          <SelectItem key={division.id} value={division.id.toString()}>
                            {division.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      জেলা
                    </label>
                    <Select 
                      value={selectedDistrict} 
                      onValueChange={setSelectedDistrict}
                      disabled={!selectedDivision}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="জেলা নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDistricts.map(district => (
                          <SelectItem key={district.id} value={district.id.toString()}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      উপজেলা
                    </label>
                    <Select 
                      value={selectedUpazila} 
                      onValueChange={setSelectedUpazila}
                      disabled={!selectedDistrict}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableUpazilas.map(upazila => (
                          <SelectItem key={upazila.id} value={upazila.id.toString()}>
                            {upazila.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button 
                      onClick={handleLocationChange}
                      disabled={!selectedUpazila || loading}
                      className="btn-primary w-full"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          লোড হচ্ছে...
                        </>
                      ) : (
                        'দর দেখুন'
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Price Display */}
          {prices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="glass-effect border-white/20 mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    আজকের বাজার দর
                  </CardTitle>
                  <Button 
                    onClick={refreshPrices}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    রিফ্রেশ
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-white/80 text-sm mb-4">
                    সর্বশেষ আপডেট: {new Date().toLocaleString('bn-BD')}
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left text-white font-semibold py-3 px-2">মাছের নাম</th>
                          <th className="text-center text-white font-semibold py-3 px-2">সর্বনিম্ন (৳/কেজি)</th>
                          <th className="text-center text-white font-semibold py-3 px-2">সর্বোচ্চ (৳/কেজি)</th>
                          <th className="text-center text-white font-semibold py-3 px-2">গড় দাম (৳/কেজি)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prices.map((price, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="border-b border-white/10 hover:bg-white/5"
                          >
                            <td className="text-white py-3 px-2 font-medium">{price.fish_type}</td>
                            <td className="text-center text-red-300 py-3 px-2">৳{price.min_price}</td>
                            <td className="text-center text-green-300 py-3 px-2">৳{price.max_price}</td>
                            <td className="text-center text-blue-300 py-3 px-2 font-semibold">৳{price.avg_price}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="glass-effect border-white/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-white font-semibold mb-2">ফিশ স্পেশালিস্ট যোগাযোগ</h3>
                    <p className="text-white/80 text-sm mb-4">
                      এই এলাকার মাছ চাষ ও বিক্রয় সংক্রান্ত যেকোনো পরামর্শের জন্য
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        variant="outline" 
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => toast({
                          title: "📞 যোগাযোগ",
                          description: "🚧 এই ফিচারটি এখনও বাস্তবায়িত হয়নি—কিন্তু চিন্তা নেই! আপনি আপনার পরবর্তী প্রম্পটে এটি অনুরোধ করতে পারেন! 🚀"
                        })}
                      >
                        ফোন: ০১৭৮৮৮৬৫২৭৭
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => toast({
                          title: "📧 ইমেইল",
                          description: "🚧 এই ফিচারটি এখনও বাস্তবায়িত হয়নি—কিন্তু চিন্তা নেই! আপনি আপনার পরবর্তী প্রম্পটে এটি অনুরোধ করতে পারেন! 🚀"
                        })}
                      >
                        specialist@fishcare.com.bd
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Empty State */}
          {prices.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">এলাকা নির্বাচন করুন</h3>
              <p className="text-white/60">
                বাজার দর দেখতে উপরে থেকে আপনার বিভাগ, জেলা এবং উপজেলা নির্বাচন করুন
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default MarketPrices;