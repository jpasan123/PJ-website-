{/* Previous imports remain unchanged */}

export default function NewsletterPage() {
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Previous content remains unchanged until the form */}
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-xl mx-auto mb-24"
      >
        <Card className="bg-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Join Our Community</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input 
                  type="text" 
                  placeholder="John Doe" 
                  required 
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                  className="form-input"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="promotions"
                  type="checkbox"
                  className="h-4 w-4 text-primary border-gray-300 rounded"
                />
                <label htmlFor="promotions" className="ml-2 block text-sm text-gray-600">
                  I want to receive promotional emails
                </label>
              </div>
              <Button type="submit" className="w-full">
                Subscribe Now
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rest of the content remains unchanged */}
    </div>
  );
}