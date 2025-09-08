import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Fish, 
  TrendingUp, 
  BookOpen, 
  Stethoscope, 
  Calculator, 
  Search,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Users,
  Award,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "🔍 অনুসন্ধান",
        description: "🚧 এই ফিচারটি এখনও বাস্তবায়িত হয়নি—কিন্তু চিন্তা নেই! আপনি আপনার পরবর্তী প্রম্পটে এটি অনুরোধ করতে পারেন! 🚀"
      });
    }
  };

  const quickLinks = [
    {
      title: 'মাছ চাষ পরামর্শ',
      description: 'বিজ্ঞানসম্মত মাছ চাষের সম্পূর্ণ গাইড',
      icon: BookOpen,
      path: '/fish-care-guide',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'রোগ ব্যবস্থাপনা',
      description: 'মাছের রোগ নির্ণয় ও চিকিৎসা',
      icon: Stethoscope,
      path: '/disease-detector',
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'দৈনিক বাজার দর',
      description: 'সর্বশেষ মাছের বাজার দর',
      icon: TrendingUp,
      path: '/market-prices',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'পুকুর ক্যালকুলেটর',
      description: 'আয়-ব্যয় হিসাব ও পরিকল্পনা',
      icon: Calculator,
      path: '/dashboard',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const features = [
    {
      icon: Users,
      title: '১০,০০০+ চাষী',
      description: 'আমাদের সাথে যুক্ত সফল মাছ চাষী'
    },
    {
      icon: Award,
      title: '৯৫% সফলতার হার',
      description: 'আমাদের পরামর্শ অনুসরণকারীদের সফলতা'
    },
    {
      icon: Target,
      title: '২৪/৭ সহায়তা',
      description: 'যেকোনো সময় বিশেষজ্ঞ পরামর্শ'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Fish Care BD - টেকসই মাছ চাষের বিশ্বস্ত সহায়ক</title>
        <meta name="description" content="টেকসই, লাভজনক ও বিজ্ঞানসম্মত মাছ চাষের সব তথ্য—এক জায়গায়। বাজার দর, চাষ পরামর্শ, রোগ নির্ণয় এবং আরও অনেক কিছু।" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 floating">
                  <Fish className="w-10 h-10 text-white" />
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  টেকসই মাছ চাষের
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    বিশ্বস্ত সহায়ক
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                  টেকসই, লাভজনক ও বিজ্ঞানসম্মত মাছ চাষের সব তথ্য—এক জায়গায়।
                </p>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl mx-auto mb-12"
              >
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    placeholder="কী খুঁজছেন? যেমন—'মনোসেক্স তেলাপিয়া খাদ্য', 'সাদা দাগ রোগ', 'শীতকালের চাষ'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-6 pr-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/70 backdrop-blur-sm"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-2 top-2 h-10 w-10 bg-white/20 hover:bg-white/30"
                  >
                    <Search className="h-5 w-5 text-white" />
                  </Button>
                </form>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
              >
                {quickLinks.map((link, index) => (
                  <Link key={index} to={link.path}>
                    <Card className="glass-effect border-white/20 hover:border-white/40 transition-all duration-300 card-hover group">
                      <CardHeader className="text-center pb-4">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${link.color} mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                          <link.icon className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-white text-lg">{link.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center pt-0">
                        <p className="text-white/80 text-sm">{link.description}</p>
                        <ArrowRight className="w-5 h-5 text-white/60 mx-auto mt-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                কেন Fish Care BD?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                বাংলাদেশের সবচেয়ে বিশ্বস্ত মাছ চাষ প্ল্যাটফর্ম
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className="glass-effect border-white/20 text-center card-hover">
                    <CardHeader>
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mb-4">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/80">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="glass-effect border-white/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-2xl md:text-3xl mb-4">
                    আমাদের সাথে যোগাযোগ করুন
                  </CardTitle>
                  <p className="text-white/80">
                    যেকোনো প্রশ্ন বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-3">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-white font-semibold">ফোন</p>
                      <p className="text-white/80">01978865277</p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-3">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-white font-semibold">ইমেইল</p>
                      <p className="text-white/80">support@fishcare.com.bd</p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mb-3">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-white font-semibold">সময়</p>
                      <p className="text-white/80">রবি–বৃহস্পতি, সকাল ৯টা–সন্ধ্যা ৬টা</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <Link to="/contact">
                      <Button className="btn-primary text-lg px-8 py-3">
                        যোগাযোগ করুন
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;