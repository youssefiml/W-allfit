// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";
import Message from "../components/Message";
import FloatingInput from "../components/forms/FloatingInput";
import GradientButton from "../components/forms/GradientButton";
import {
  FlowerIcon,
  FitnessIcon,
  WeightLiftingIcon,
} from "../components/icons/Icons";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    age: "",
    weight: "",
    height: "",
    goal: ""
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        const data = res.data;
        setProfile({
          name: data.name || "",
          email: data.email || "",
          age: data.age?.toString() || "",
          weight: data.weight?.toString() || "",
          height: data.height?.toString() || "",
          goal: data.goal || ""
        });
      } catch (err) {
        setMessage({ 
          type: "error", 
          text: err.response?.data?.error || "Error loading profile" 
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address";
        }
        break;
      case "age":
        if (value && (isNaN(value) || parseInt(value) < 13 || parseInt(value) > 120)) {
          return "Please enter a valid age (13-120)";
        }
        break;
      case "weight":
        if (value && (isNaN(value) || parseFloat(value) < 30 || parseFloat(value) > 300)) {
          return "Please enter a valid weight (30-300 kg)";
        }
        break;
      case "height":
        if (value && (isNaN(value) || parseFloat(value) < 100 || parseFloat(value) > 250)) {
          return "Please enter a valid height (100-250 cm)";
        }
        break;
      default:
        break;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    
    // Validate on change
    const error = validateField(name, value);
    if (error) {
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(profile).forEach(key => {
      if (key === "email" || key === "name") {
        if (!profile[key].trim()) {
          newErrors[key] = "This field is required";
        }
      }
      const error = validateField(key, profile[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage({ type: "error", text: "Please fix the errors before submitting" });
      return;
    }
    
    setSaving(true);
    try {
      const payload = {
        ...profile,
        age: profile.age ? parseInt(profile.age) : undefined,
        weight: profile.weight ? parseFloat(profile.weight) : undefined,
        height: profile.height ? parseFloat(profile.height) : undefined,
      };
      
      const res = await api.put("/profile", payload);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setProfile({
        name: res.data.name || "",
        email: res.data.email || "",
        age: res.data.age?.toString() || "",
        weight: res.data.weight?.toString() || "",
        height: res.data.height?.toString() || "",
        goal: res.data.goal || ""
      });
      setErrors({});
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: err.response?.data?.error || "Error updating profile" 
      });
    } finally {
      setSaving(false);
    }
  };

  // Calculate BMI if weight and height are available
  const calculateBMI = () => {
    if (profile.weight && profile.height) {
      const weight = parseFloat(profile.weight);
      const height = parseFloat(profile.height) / 100; // convert cm to m
      if (weight > 0 && height > 0) {
        return (weight / (height * height)).toFixed(1);
      }
    }
    return null;
  };

  const bmi = calculateBMI();
  const bmiCategory = bmi ? 
    (bmi < 18.5 ? "Underweight" : 
     bmi < 25 ? "Normal" : 
     bmi < 30 ? "Overweight" : "Obese") : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8"
    >
      {message && (
        <Message
          message={message.text}
          type={message.type}
          onClose={() => setMessage(null)}
          duration={message.type === "success" ? 3000 : 5000}
        />
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Your Wellness Profile
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your personal information and wellness goals to receive personalized recommendations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full">
                <FlowerIcon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
                {profile.name || "Your Name"}
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                {profile.email || "your@email.com"}
              </p>

              {/* Stats Grid */}
              <div className="space-y-4">
                {profile.age && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">Age</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{profile.age} years</span>
                  </div>
                )}
                
                {bmi && (
                  <div className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">BMI</span>
                      <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">{bmi}</span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Category: <span className="font-semibold">{bmiCategory}</span>
                    </div>
                  </div>
                )}

                {profile.goal && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-start gap-2">
                      <FitnessIcon className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-xs text-gray-600 dark:text-gray-400 block">Goal</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{profile.goal}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <WeightLiftingIcon className="w-6 h-6 text-pink-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FloatingInput
                      type="text"
                      id="name"
                      name="name"
                      label="Full Name"
                      value={profile.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                      autoComplete="name"
                    />
                    <FloatingInput
                      type="email"
                      id="email"
                      name="email"
                      label="Email Address"
                      value={profile.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Health Metrics Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                    Health Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FloatingInput
                      type="number"
                      id="age"
                      name="age"
                      label="Age (years)"
                      value={profile.age}
                      onChange={handleChange}
                      error={errors.age}
                      autoComplete="off"
                    />
                    <FloatingInput
                      type="number"
                      id="weight"
                      name="weight"
                      label="Weight (kg)"
                      value={profile.weight}
                      onChange={handleChange}
                      error={errors.weight}
                      autoComplete="off"
                    />
                    <FloatingInput
                      type="number"
                      id="height"
                      name="height"
                      label="Height (cm)"
                      value={profile.height}
                      onChange={handleChange}
                      error={errors.height}
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* Wellness Goals Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                    Wellness Goals
                  </h3>
                  <FloatingInput
                    type="text"
                    id="goal"
                    name="goal"
                    label="Your Wellness Goal (e.g., Weight loss, Muscle gain, General fitness)"
                    value={profile.goal}
                    onChange={handleChange}
                    error={errors.goal}
                    autoComplete="off"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Share your primary wellness goal to help us personalize your experience
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <GradientButton type="submit" loading={saving} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </GradientButton>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}