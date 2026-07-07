import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar Skeleton - hidden on mobile, shown on lg+ */}
            <div className="hidden lg:flex flex-col w-64 bg-card border-r border-border h-full shrink-0">
                {/* Logo */}
                <div className="p-6">
                    <Skeleton className="h-8 w-24" />
                </div>

                {/* Nav Items */}
                <div className="flex-1 px-3 py-2 space-y-2">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-3 px-4 py-3">
                            <Skeleton className="w-5 h-5 rounded" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    ))}
                </div>

                {/* Community sections */}
                <div className="px-4 pt-4 border-t border-border space-y-3">
                    <Skeleton className="h-4 w-24" />
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-2 py-1">
                            <Skeleton className="w-8 h-8 rounded-full" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    ))}
                </div>
                <div className="px-4 pt-4 pb-2 border-t border-border space-y-3">
                    <Skeleton className="h-4 w-28" />
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-2 py-1">
                            <Skeleton className="w-8 h-8 rounded-full" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    ))}
                </div>

                {/* Settings at bottom */}
                <div className="p-4 border-t border-border">
                    <div className="flex items-center space-x-3">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
                {/* Header Skeleton */}
                <header className="bg-card py-4 px-6 flex items-center justify-between border-b border-border">
                    <div className="flex items-center space-x-4">
                        {/* Mobile hamburger */}
                        <Skeleton className="lg:hidden w-8 h-8 rounded-md" />
                        <Skeleton className="h-6 w-28" />
                    </div>
                    <Skeleton className="h-9 w-36 rounded-full" />
                </header>

                {/* Content Area */}
                <main className="flex-1 p-6 overflow-auto">
                    <div className="max-w-5xl mx-auto space-y-6">
                        {/* Hero block */}
                        <div className="space-y-3">
                            <Skeleton className="h-8 w-64" />
                            <Skeleton className="h-4 w-96" />
                        </div>

                        {/* Card grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-card border border-border rounded-xl p-5 space-y-4">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-8 w-16" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            ))}
                        </div>

                        {/* List items */}
                        <div className="space-y-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-card border border-border rounded-lg p-4 flex items-center space-x-4">
                                    <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-40" />
                                        <Skeleton className="h-3 w-64" />
                                    </div>
                                    <Skeleton className="h-8 w-20 rounded-md" />
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
