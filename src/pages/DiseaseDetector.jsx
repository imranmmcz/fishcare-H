import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Stethoscope, CheckCircle, AlertTriangle, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const DiseaseDetector = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [waterQuality, setWaterQuality] = useState({
    temperature: '',
    ph: '',
    oxygen: '',
    ammonia: ''
  });
  const [diagnosis, setDiagnosis] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const symptoms = [
    { id: 1, name: 'মাছের গায়ে সাদা দাগ', category: 'skin' },
    { id: 2, name: 'ফুলকা লাল হয়ে যাওয়া', category: 'gills' },
    { id: 3, name: 'মাছের পেট ফুলে যাওয়া', category: 'body' },
    { id: 4, name: 'চোখ ফুলে যাওয়া', category: 'eyes' },
    { id: 5, name: 'পাখনা ক্ষয় হওয়া', category: 'fins' },
    { id: 6, name: 'মাছের গায়ে ক্ষত', category: 'skin' },
    { id: 7, name: 'অস্বাভাবিক সাঁতার', category: 'behavior' },
    { id: 8, name: 'খাবার না খাওয়া', category: 'behavior' },
    { id: 9, name: 'পানির উপরে ভেসে থাকা', category: 'behavior' },
    { id: 10, name: 'মাছের গায়ে কালো দাগ', category: 'skin' },
    { id: 11, name: 'ফুলকা থেকে রক্ত পড়া', category: 'gills' },
    { id: 12, name: 'মাছের মৃত্যু', category: 'mortality' }
  ];

  const diseases = [
    {
      name: 'সাদা দাগ রোগ (White Spot Disease)',
      symptoms: [1, 7, 8],
      probability: 85,
      treatment: [
        'পানির তাপমাত্রা ২-৩ ডিগ্রি বাড়ান',
        'লবণ ০.৩% হারে প্রয়োগ করুন',
        'মেথিলিন ব্লু ১-২ ppm ব্যবহার করুন',
        'পানি পরিবর্তনের হার বাড়ান'
      ],
      prevention: [
        'নতুন মাছ কোয়ারেন্টাইন করুন',
        'পানির গুণমান নিয়ন্ত্রণে রাখুন',
        'অতিরিক্ত স্টকিং এড়িয়ে চলুন'
      ]
    },
    {
      name: 'ব্যাকটেরিয়াল ইনফেকশন',
      symptoms: [2, 6, 11],
      probability: 75,
      treatment: [
        'অক্সিটেট্রাসাইক্লিন ৫০-৭৫ mg/kg খাবারের সাথে',
        'পটাশিয়াম পারম্যাঙ্গানেট ২-৪ ppm',
        'পানি সম্পূর্ণ পরিবর্তন করুন',
        '৭-১০ দিন চিকিৎসা চালিয়ে যান'
      ],
      prevention: [
        'পানির গুণমান ভালো রাখুন',
        'নিয়মিত চুন প্রয়োগ করুন',
        'মৃত মাছ তাৎক্ষণিক সরান'
      ]
    },
    {
      name: 'ড্রপসি (Dropsy)',
      symptoms: [3, 4, 7],
      probability: 70,
      treatment: [
        'এপসম সল্ট ১-৩ গ্রাম/লিটার',
        'অ্যান্টিবায়োটিক চিকিৎসা',
        'খাবারে লবণ মিশান',
        'পানির তাপমাত্রা স্থিতিশীল রাখুন'
      ],
      prevention: [
        'উন্নত মানের খাবার দিন',
        'অতিরিক্ত খাবার এড়িয়ে চলুন',
        'নিয়মিত পানি পরীক্ষা করুন'
      ]
    }
  ];

  const handleSymptomToggle = (symptomId) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleWaterQualityChange = (field, value) => {
    setWaterQuality(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analyzeDiagnosis = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "⚠️ লক্ষণ নির্বাচন করুন",
        description: "অন্তত একটি লক্ষণ নির্বাচন করুন"
      });
      return;
    }

    const possibleDiseases = diseases.map(disease => {
      const matchingSymptoms = disease.symptoms.filter(symptom => 
        selectedSymptoms.includes(symptom)
      );
      const matchPercentage = (matchingSymptoms.length / disease.symptoms.length) * 100;
      
      return {
        ...disease,
        matchPercentage: Math.round(matchPercentage),
        confidence: matchPercentage > 50 ? 'উচ্চ' : matchPercentage > 25 ? 'মধ্যম' : 'নিম্ন'
      };
    }).filter(disease => disease.matchPercentage > 0)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    setDiagnosis(possibleDiseases);
    setCurrentStep(4);
  };

  const resetDiagnosis = () => {
    setSelectedSymptoms([]);
    setWaterQuality({ temperature: '', ph: '', oxygen: '', ammonia: '' });
    setDiagnosis(null);
    setCurrentStep(1);
  };

  const handleExpertConsultation = () => {
    toast({
      title: "👨‍⚕️ বিশেষজ্ঞ পরামর্শ",
      description: "🚧 এই ফিচারটি এখনও বাস্তবায়িত হয়নি—কিন্তু চিন্তা নেই! আপনি আপনার পরবর্তী প্রম্পটে এটি অনুরোধ করতে পারেন! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>রোগ নির্ণয়কারী - Fish Care BD</title>
        <meta name="description" content="মাছের রোগ নির্ণয় করুন এবং সঠিক চিকিৎসা পদ্ধতি জানুন। ইন্টারঅ্যাকটিভ রোগ নির্ণয় সিস্টেম।" />
      </Helmet>

      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-4">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              রোগ নির্ণয়কারী
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              মাছের লক্ষণ দেখে রোগ নির্ণয় করুন এবং সঠিক চিকিৎসা পান
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                      : 'bg-white/20 text-white/60'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-8 h-0.5 ${
                      currentStep > step ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step 1: Symptoms Selection */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="glass-effect border-white/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-white text-center">
                    ধাপ ১: লক্ষণ নির্বাচন করুন
                  </CardTitle>
                  <p className="text-white/80 text-center">
                    আপনার মাছে যে লক্ষণগুলো দেখছেন সেগুলো টিক দিন (একাধিক নির্বাচন করতে পারেন)
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {symptoms.map((symptom) => (
                      <div
                        key={symptom.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                          selectedSymptoms.includes(symptom.id)
                            ? 'border-blue-400 bg-blue-500/20'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                        onClick={() => handleSymptomToggle(symptom.id)}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                            selectedSymptoms.includes(symptom.id)
                              ? 'border-blue-400 bg-blue-500'
                              : 'border-white/40'
                          }`}>
                            {selectedSymptoms.includes(symptom.id) && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="text-white">{symptom.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      onClick={() => setCurrentStep(2)}
                      disabled={selectedSymptoms.length === 0}
                      className="btn-primary"
                    >
                      পরবর্তী ধাপ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Water Quality */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="glass-effect border-white/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-white text-center">
                    ধাপ ২: পানির গুণমান (ঐচ্ছিক)
                  </CardTitle>
                  <p className="text-white/80 text-center">
                    পানির গুণমান সংক্রান্ত তথ্য দিলে আরও নির্ভুল নির্ণয় পাবেন
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        তাপমাত্রা (°C)
                      </label>
                      <Input
                        type="number"
                        placeholder="যেমন: 28"
                        value={waterQuality.temperature}
                        onChange={(e) => handleWaterQualityChange('temperature', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        pH মান
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="যেমন: 7.5"
                        value={waterQuality.ph}
                        onChange={(e) => handleWaterQualityChange('ph', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        দ্রবীভূত অক্সিজেন (ppm)
                      </label>
                      <Input
                        type="number"
                        placeholder="যেমন: 6"
                        value={waterQuality.oxygen}
                        onChange={(e) => handleWaterQualityChange('oxygen', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        অ্যামোনিয়া (ppm)
                      </label>
                      <Input
                        type="number"
                        placeholder="যেমন: 0.5"
                        value={waterQuality.ammonia}
                        onChange={(e) => handleWaterQualityChange('ammonia', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      পূর্ববর্তী
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(3)}
                      className="btn-primary"
                    >
                      পরবর্তী ধাপ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Analysis */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="glass-effect border-white/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-white text-center">
                    ধাপ ৩: বিশ্লেষণ
                  </CardTitle>
                  <p className="text-white/80 text-center">
                    আপনার দেওয়া তথ্যের ভিত্তিতে রোগ নির্ণয় করা হবে
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="bg-white/10 rounded-lg p-6 mb-4">
                      <h3 className="text-white font-semibold mb-2">নির্বাচিত লক্ষণসমূহ:</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {selectedSymptoms.map(symptomId => {
                          const symptom = symptoms.find(s => s.id === symptomId);
                          return (
                            <span key={symptomId} className="bg-blue-500/30 text-white px-3 py-1 rounded-full text-sm">
                              {symptom?.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={() => setCurrentStep(2)}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      পূর্ববর্তী
                    </Button>
                    <Button 
                      onClick={analyzeDiagnosis}
                      className="btn-primary"
                    >
                      রোগ নির্ণয় করুন
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {currentStep === 4 && diagnosis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="glass-effect border-white/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-white text-center">
                    ধাপ ৪: নির্ণয় ফলাফল
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {diagnosis.length > 0 ? (
                    <div className="space-y-6">
                      {diagnosis.map((disease, index) => (
                        <div key={index} className="bg-white/10 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white text-xl font-semibold">{disease.name}</h3>
                            <div className="flex items-center space-x-2">
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                disease.confidence === 'উচ্চ' ? 'bg-green-500/30 text-green-300' :
                                disease.confidence === 'মধ্যম' ? 'bg-yellow-500/30 text-yellow-300' :
                                'bg-red-500/30 text-red-300'
                              }`}>
                                {disease.confidence} সম্ভাবনা
                              </span>
                              <span className="text-white/80 text-sm">{disease.matchPercentage}% মিল</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-white font-semibold mb-2 flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-2 text-red-400" />
                                চিকিৎসা
                              </h4>
                              <ul className="space-y-1">
                                {disease.treatment.map((treatment, idx) => (
                                  <li key={idx} className="text-white/80 text-sm flex items-start">
                                    <span className="text-red-400 mr-2">•</span>
                                    {treatment}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="text-white font-semibold mb-2 flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                                প্রতিরোধ
                              </h4>
                              <ul className="space-y-1">
                                {disease.prevention.map((prevention, idx) => (
                                  <li key={idx} className="text-white/80 text-sm flex items-start">
                                    <span className="text-green-400 mr-2">•</span>
                                    {prevention}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-white text-xl font-semibold mb-2">কোনো রোগ নির্ণয় করা যায়নি</h3>
                      <p className="text-white/80">
                        আপনার দেওয়া লক্ষণের সাথে আমাদের ডাটাবেসের কোনো রোগ মিলেনি। 
                        বিশেষজ্ঞের সাথে যোগাযোগ করুন।
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-center space-x-4 mt-8">
                    <Button 
                      onClick={resetDiagnosis}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      নতুন নির্ণয়
                    </Button>
                    <Button 
                      onClick={handleExpertConsultation}
                      className="btn-primary"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      বিশেষজ্ঞের সাথে কথা বলুন
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default DiseaseDetector;