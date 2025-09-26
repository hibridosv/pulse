export function SkeletonForm() {
    return (
        <div className="bg-bg-content rounded-2xl shadow-lg border border-bg-subtle p-4 w-full max-w-4xl mx-auto animate-pulse">
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 border-b border-bg-subtle pb-6">
                    <div>
                        <div className="h-4 bg-bg-subtle rounded-md w-1/3 mb-1"></div>
                        <div className="h-10 bg-bg-subtle rounded-md w-full"></div>
                    </div>
                    <div>
                        <div className="h-4 bg-bg-subtle rounded-md w-1/3 mb-1"></div>
                        <div className="h-10 bg-bg-subtle rounded-md w-full"></div>
                    </div>
                    <div>
                        <div className="h-4 bg-bg-subtle rounded-md w-1/3 mb-1"></div>
                        <div className="h-10 bg-bg-subtle rounded-md w-full"></div>
                    </div>
                    <div className="flex items-end pb-1">
                        <div className="flex items-center">
                            <div className="h-6 w-11 bg-bg-subtle rounded-full"></div>
                            <div className="h-4 bg-bg-subtle rounded-md w-24 ml-3"></div>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <div className="h-4 bg-bg-subtle rounded-md w-1/4 mb-1"></div>
                        <div className="h-20 bg-bg-subtle rounded-md w-full"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2">
                    <div className="bg-bg-subtle/50 p-2 rounded-lg h-10"></div>
                    <div className="bg-bg-subtle/50 p-2 rounded-lg h-10"></div>
                </div>


                <div className="flex justify-center pt-6 border-t border-bg-subtle">
                    <div className="h-10 bg-bg-subtle rounded-lg w-32"></div>
                </div>
            </div>
        </div>
    );
}
