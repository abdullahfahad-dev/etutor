import { motion } from "motion/react"
export function Loading() {
    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="flex items-center gap-1 mb-8"
            >
                <span className="text-4xl font-extrabold text-orange-500">e</span>
                <span className="text-4xl font-bold text-emerald-600">Tutor</span>
            </motion.div>
            
            <div className="relative">
                <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-orange-50 rounded-full"></div>
                </div>
            </div>
            
            <p className="mt-4 text-gray-400 text-sm font-medium animate-pulse">Loading experience...</p>
        </div>
    );
}
