import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { BookOpen, Fish, Droplets, Utensils, Calendar, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const FishCareGuide = () => {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const { toast } = useToast();

  const fishGuides = [
    {
      id: 1,
      name: 'রুই মাছ চাষ',
      icon: '🐟',
      description: 'রুই মাছের সম্পূর্ণ চাষ পদ্ধতি',
      details: {
        introduction: 'রুই মাছ বাংলাদেশের অন্যতম জনপ্রিয় মাছ। এটি দ্রুত বৃদ্ধি পায় এবং বাজারে ভালো দাম পাওয়া যায়।',
        requirements: [
          'পুকুরের গভীরতা ৪-৬ ফুট',
          'পানির তাপমাত্রা ২৫-৩০ ডিগ্রি সেলসিয়াস',
          'pH ৭-৮.৫',
          'দ্রবীভূত অক্সিজেন ৫ ppm এর বেশি'
        ],
        feeding: [
          'প্রাকৃতিক খাবার: ফাইটোপ্ল্যাঙ্কটন, জুপ্ল্যাঙ্কটন',
          'সম্পূরক খাবার: চালের কুঁড়া, সরিষার খৈল',
          'দৈনিক ২-৩% হারে খাবার দিন',
          'দিনে ২-৩ বার খাবার দিন'
        ],
        harvesting: 'সাধারণত ৮-১০ মাসে ৮০০-১২০০ গ্রাম ওজনে আহরণ করা যায়।',
        problems: [
          'EUS রোগ: পানির গুণমান ভালো রাখুন',
          'গ্যাস রোগ: নিয়মিত চুন প্রয়োগ করুন',
          'পরজীবী আক্রমণ: লবণ পানি দিয়ে চিকিৎসা করুন'
        ]
      }
    },
    {
      id: 2,
      name: 'তেলাপিয়া চাষ',
      icon: '🐠',
      description: 'তেলাপিয়া মাছের আধুনিক চাষ পদ্ধতি',
      details: {
        introduction: 'তেলাপিয়া একটি দ্রুত বর্ধনশীল মাছ যা কম খরচে চাষ করা যায় এবং রোগ প্রতিরোধ ক্ষমতা বেশি।',
        requirements: [
          'পুকুরের গভীরতা ৩-৫ ফুট',
          'পানির তাপমাত্রা ২২-৩২ ডিগ্রি সেলসিয়াস',
          'pH ৬.৫-৮.৫',
          'স্টকিং ডেনসিটি ৫০০০-৮০০০ পিস/একর'
        ],
        feeding: [
          'প্রোটিন ২৮-৩২%',
          'ভাসমান খাবার ব্যবহার করুন',
          'দৈনিক ৩-৫% হারে খাবার দিন',
          'দিনে ৩-৪ বার খাবার দিন'
        ],
        harvesting: '৫-৬ মাসে ২৫০-৪০০ গ্রাম ওজনে আহরণ করা যায়।',
        problems: [
          'স্ট্রেপ্টোকক্কাস: অ্যান্টিবায়োটিক ব্যবহার করুন',
          'ফ্লেক্স: পানির গুণমান উন্নত করুন',
          'অতিরিক্ত প্রজনন: মনোসেক্স পোনা ব্যবহার করুন'
        ]
      }
    },
    {
      id: 3,
      name: 'পাঙ্গাস চাষ',
      icon: '🐡',
      description: 'পাঙ্গাস মাছের বাণিজ্যিক চাষ',
      details: {
        introduction: 'পাঙ্গাস একটি অত্যন্ত লাভজনক মাছ যা দ্রুত বৃদ্ধি পায় এবং বাজারে ভালো চাহিদা রয়েছে।',
        requirements: [
          'পুকুরের গভীরতা ৮-১২ ফুট',
          'পানির তাপমাত্রা ২৬-৩০ ডিগ্রি সেলসিয়াস',
          'pH ৬.৫-৮.০',
          'স্টকিং ডেনসিটি ২৫০০০-৩০০০০ পিস/একর'
        ],
        feeding: [
          'প্রোটিন ২৮-৩০%',
          'ভাসমান খাবার প্রয়োজন',
          'দৈনিক ২-৪% হারে খাবার দিন',
          'দিনে ৪-৫ বার খাবার দিন'
        ],
        harvesting: '৬-৮ মাসে ৮০০-১২০০ গ্রাম ওজনে আহরণ করা যায়।',
        problems: [
          'ব্যাকটেরিয়াল ইনফেকশন: পানি পরিবর্তন করুন',
          'ভাইরাল রোগ: জৈব নিরাপত্তা বজায় রাখুন',
          'পানির দূষণ: নিয়মিত পানি পরীক্ষা করুন'
        ]
      }
    },
    {
      id: 4,
      name: 'কৈ মাছ চাষ',
      icon: '🎣',
      description: 'কৈ মাছের লাভজনক চাষ পদ্ধতি',
      details: {
        introduction: 'কৈ মাছ অত্যন্ত পুষ্টিকর এবং রোগীদের জন্য উপকারী। এটি কম অক্সিজেনেও বেঁচে থাকতে পারে।',
        requirements: [
          'পুকুরের গভীরতা ৩-৪ ফুট',
          'পানির তাপমাত্রা ২৪-৩০ ডিগ্রি সেলসিয়াস',
          'pH ৬.৫-৮.০',
          'স্টকিং ডেনসিটি ১০০০০-১৫০০০ পিস/একর'
        ],
        feeding: [
          'প্রোটিন ৩০-৩৫%',
          'ডুবন্ত খাবার ব্যবহার করুন',
          'দৈনিক ৩-৫% হারে খাবার দিন',
          'দিনে ২-৩ বার খাবার দিন'
        ],
        harvesting: '৪-৫ মাসে ১৫০-২৫০ গ্রাম ওজনে আহরণ করা যায়।',
        problems: [
          'EUS রোগ: পটাশিয়াম পারম্যাঙ্গানেট ব্যবহার করুন',
          'ফুলকা পচা রোগ: লবণ পানি দিয়ে চিকিৎসা করুন',
          'পেট ফোলা রোগ: খাবারের পরিমাণ কমান'
        ]
      }
    }
  ];

  const handleGuideClick = (guide) => {
    setSelectedGuide(guide);
  };

  const handleBackToList = () => {
    setSelectedGuide(null);
  };

  const handleFeatureClick = (feature) => {
    toast({
      title: `📚 ${feature}`,
      description: "🚧 এই ফিচারটি এখনও বাস্তবায়িত হয়নি—কিন্তু চিন্তা নেই! আপনি আপনার পরবর্তী প্রম্পটে এটি অনুরোধ করতে পারেন! 🚀"
    });
  };

  if (selectedGuide) {
    return (
      <>
        <Helmet>
          <title>{selectedGuide.name} - Fish Care BD</title>
          <meta name="description" content={`${selectedGuide.name} এর সম্পূর্ণ চাষ পদ্ধতি, খাদ্য ব্যবস্থাপনা এবং রোগ প্রতিরোধ।`} />
        </Helmet>

        <div className="min-h-screen py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Button 
              onClick={handleBackToList}
              variant="ghost"
              className="text-white hover:bg-white/20 mb-6"
            >
              ← সব গাইডে ফিরে যান
            </Button>

            <Card className="glass-effect border-white/20 mb-6">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{selectedGuide.icon}</div>
                <CardTitle className="text-white text-3xl">{selectedGuide.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 text-lg text-center">
                  {selectedGuide.details.introduction}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Requirements */}
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Droplets className="w-5 h-5 mr-2" />
                    প্রয়োজনীয় শর্ত
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedGuide.details.requirements.map((req, index) => (
                      <li key={index} className="text-white/80 flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Feeding */}
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Utensils className="w-5 h-5 mr-2" />
                    খাদ্য ব্যবস্থাপনা
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedGuide.details.feeding.map((feed, index) => (
                      <li key={index} className="text-white/80 flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        {feed}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Harvesting */}
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    আহরণ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">{selectedGuide.details.harvesting}</p>
                </CardContent>
              </Card>

              {/* Problems */}
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    সাধারণ সমস্যা ও সমাধান
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedGuide.details.problems.map((problem, index) => (
                      <li key={index} className="text-white/80 flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        {problem}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>মাছ চাষ পরামর্শ - Fish Care BD</title>
        <meta name="description" content="বিজ্ঞানসম্মত মাছ চাষের সম্পূর্ণ গাইড। রুই, কাতলা, তেলাপিয়া, পাঙ্গাস সহ সকল মাছের চাষ পদ্ধতি।" />
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              মাছ চাষ পরামর্শ
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              বিজ্ঞানসম্মত ও লাভজনক মাছ চাষের সম্পূর্ণ গাইড
            </p>
          </motion.div>

          {/* Fish Guides Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {fishGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="glass-effect border-white/20 cursor-pointer card-hover group"
                  onClick={() => handleGuideClick(guide)}
                >
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {guide.icon}
                    </div>
                    <CardTitle className="text-white text-lg">{guide.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <p className="text-white/80 text-sm">{guide.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card 
              className="glass-effect border-white/20 cursor-pointer card-hover"
              onClick={() => handleFeatureClick('মৌসুমি পরামর্শ')}
            >
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">মৌসুমি পরামর্শ</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-white/80 text-sm">
                  বিভিন্ন ঋতুতে মাছ চাষের বিশেষ পরামর্শ
                </p>
              </CardContent>
            </Card>

            <Card 
              className="glass-effect border-white/20 cursor-pointer card-hover"
              onClick={() => handleFeatureClick('প্রজাতি তথ্যভান্ডার')}
            >
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-3">
                  <Fish className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">প্রজাতি তথ্যভান্ডার</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-white/80 text-sm">
                  বিভিন্ন মাছের প্রজাতির বিস্তারিত তথ্য
                </p>
              </CardContent>
            </Card>

            <Card 
              className="glass-effect border-white/20 cursor-pointer card-hover"
              onClick={() => handleFeatureClick('পুকুর ব্যবস্থাপনা')}
            >
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mb-3">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">পুকুর ব্যবস্থাপনা</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-white/80 text-sm">
                  পুকুর প্রস্তুতি ও রক্ষণাবেক্ষণ
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FishCareGuide;