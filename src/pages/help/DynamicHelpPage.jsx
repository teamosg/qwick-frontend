import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const DynamicHelpPage = () => {
  const { category } = useParams();
  const [helpContent, setHelpContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock API data - replace with actual API call
  const mockData = {
    creators: {
      title: "Creators",
      faqs: [
        {
          id: "item-1",
          question: "How do I get started as a creator?",
          answer:
            "To get started as a creator, you need to create an account and complete your profile setup. Then you can start publishing content and building your community.",
        },
        {
          id: "item-2",
          question: "What types of content can I create?",
          answer:
            "You can create various types of content including articles, videos, podcasts, and interactive posts. Make sure your content follows our community guidelines.",
        },
        {
          id: "item-3",
          question: "How do I monetize my content?",
          answer:
            "You can monetize through subscriptions, one-time payments, tips, and affiliate partnerships. Set up your payment methods in the creator dashboard.",
        },
        {
          id: "item-4",
          question: "What are the content guidelines?",
          answer:
            "Content must be original, respectful, and follow our community standards. No spam, harassment, or inappropriate material is allowed.",
        },
      ],
    },
    affiliates: {
      title: "Affiliates",
      faqs: [
        {
          id: "item-1",
          question: "How do I become an affiliate?",
          answer:
            "Apply through our affiliate program page. We review applications and approve qualified candidates based on their audience and content quality.",
        },
        {
          id: "item-2",
          question: "What commission rates do you offer?",
          answer:
            "Commission rates vary by product and tier. Standard rates start at 20% and can go up to 50% for top-performing affiliates.",
        },
        {
          id: "item-3",
          question: "How often are payments made?",
          answer:
            "Payments are made monthly on the 15th of each month for commissions earned in the previous month.",
        },
        {
          id: "item-4",
          question: "What marketing materials are available?",
          answer:
            "We provide banners, product images, promotional codes, and email templates to help you promote our products effectively.",
        },
      ],
    },
    billing: {
      title: "Billing & Subscription",
      faqs: [
        {
          id: "item-1",
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards, PayPal, and bank transfers. Some regions also support digital wallets like Apple Pay and Google Pay.",
        },
        {
          id: "item-2",
          question: "Can I cancel my subscription anytime?",
          answer:
            "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.",
        },
        {
          id: "item-3",
          question: "How do I update my payment method?",
          answer:
            "Go to your account settings, then billing section. You can add, update, or remove payment methods from there.",
        },
        {
          id: "item-4",
          question: "What is your refund policy?",
          answer:
            "We offer a 30-day money-back guarantee for all subscriptions. Contact our support team to process refunds.",
        },
      ],
    },
    account: {
      title: "Account Settings",
      faqs: [
        {
          id: "item-1",
          question: "How do I change my password?",
          answer:
            "Go to account settings, then security section. Click 'Change Password' and follow the instructions to update your password.",
        },
        {
          id: "item-2",
          question: "Can I enable two-factor authentication?",
          answer:
            "Yes, you can enable 2FA in the security settings. We recommend using an authenticator app for better security.",
        },
        {
          id: "item-3",
          question: "How do I update my profile information?",
          answer:
            "Navigate to your profile settings where you can update your name, bio, profile picture, and other personal information.",
        },
        {
          id: "item-4",
          question: "How do I delete my account?",
          answer:
            "Account deletion can be requested through account settings. This action is permanent and cannot be undone.",
        },
      ],
    },
    "content-reward": {
      title: "Content Reward",
      faqs: [
        {
          id: "item-1",
          question: "How does the content reward system work?",
          answer:
            "Content rewards are based on engagement metrics, content quality, and community impact. Higher-performing content earns more rewards.",
        },
        {
          id: "item-2",
          question: "When are rewards paid out?",
          answer:
            "Rewards are calculated monthly and paid out on the 1st of each month for the previous month's performance.",
        },
        {
          id: "item-3",
          question: "What is the minimum payout threshold?",
          answer:
            "The minimum payout threshold is $10. Rewards below this amount will accumulate until the threshold is reached.",
        },
        {
          id: "item-4",
          question: "How can I maximize my content rewards?",
          answer:
            "Focus on creating high-quality, engaging content that provides value to your audience. Regular posting and community interaction also help.",
        },
      ],
    },
  };

  useEffect(() => {
    // Dynamic API call based on category from route
    const fetchContent = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Dynamic API call - replace with actual endpoint
        // const response = await fetch(`/api/help/${category}`);
        // const data = await response.json();

        // For now, using mock data but dynamically selecting based on category
        const content = mockData[category];
        if (content) {
          setHelpContent(content);
        } else {
          // If category doesn't exist in mock data, create a generic response
          setHelpContent({
            title:
              category.charAt(0).toUpperCase() +
              category.slice(1).replace("-", " "),
            faqs: [
              {
                id: "item-1",
                question: `What is ${category}?`,
                answer: `This section contains help articles related to ${category}. More content will be added soon.`,
              },
              {
                id: "item-2",
                question: `How do I get help with ${category}?`,
                answer: `For specific questions about ${category}, please contact our support team or check our documentation.`,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching help content:", error);
        setHelpContent(null);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchContent();
    }
  }, [category]);

  if (loading) {
    return (
      <div className="p-12 dark:bg-background w-full">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!helpContent) {
    return (
      <div className="p-12 dark:bg-background w-full">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">
            Category Not Found
          </h1>
          <p className="text-muted-foreground dark:text-muted-foreground">
            The requested help category does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-12 dark:bg-background w-full">
      <div className="mb-6 inline-block">
        <h1 className="text-foreground-strong dark:text-white text-4xl font-semibold">
          {helpContent.title}
        </h1>
      </div>
      <AccordionPrimitive.Root type="single" collapsible className="space-y-4">
        {helpContent.faqs.map((faq) => (
          <AccordionPrimitive.Item
            key={faq.id}
            value={faq.id}
            className="border-b border-border"
          >
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="w-full py-6 flex items-center justify-between text-left group">
                <span className="font-bold text-foreground font-inter group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <div className="w-6 h-6 flex items-center justify-center">
                  <Plus className="group-data-[state=open]:hidden transition-transform" size={20} />
                  <Minus className="hidden group-data-[state=open]:block transition-transform" size={20} />
                </div>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="pb-6 text-muted-foreground font-inter text-sm leading-relaxed">
                {faq.answer}
              </div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    </div>
  );
};

export default DynamicHelpPage;
