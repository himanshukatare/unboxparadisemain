import React from 'react';

const OurProcess = ({ data }) => {
    if (!data) return null;

    return (
        <section className="page-section relative z-10 px-4 sm:px-4">
            {/* <div className="text-center mb-10 md:mb-12">
                <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">
                    {data.heading}
                </h2>
                {data.subheading && (
                    <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto mt-3">
                        {data.subheading}
                    </p>
                )}
            </div> */}

            <div className="relative mx-auto w-full max-w-[1100px]">
                <div className="pointer-events-none absolute left-1/2 top-12 hidden h-[calc(100%-6rem)] -translate-x-1/2 border-l border-white/10 sm:block" />

                <div className="space-y-8">
                    {data.steps.map((step, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div
                                key={step.id || index}
                                className={`flex flex-col sm:grid sm:grid-cols-[minmax(0,1fr)_140px_minmax(0,1fr)] sm:items-center ${
                                    isEven ? 'sm:text-right' : 'sm:text-left'
                                }`}
                            >
                                {isEven ? (
                                    <>
                                        <div className="order-2 sm:order-1">
                                            <ProcessCard step={step} alignment="right" />
                                        </div>
                                        <StepMarker
                                            number={step.number}
                                            icon={step.icon}
                                            direction="right"
                                        />
                                        <div className="hidden sm:block sm:order-3" />
                                    </>
                                ) : (
                                    <>
                                        <div className="hidden sm:block sm:order-1" />
                                        <StepMarker
                                            number={step.number}
                                            icon={step.icon}
                                            direction="left"
                                        />
                                        <div className="order-2 sm:order-3">
                                            <ProcessCard step={step} alignment="left" />
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const StepMarker = ({ number, icon }) => (
    <div className="order-1 sm:order-2 mx-auto flex flex-col items-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[rgb(226,168,43)] to-[rgb(184,3,124)] text-xl font-bold text-white shadow-lg shadow-pink-500/30">
            {number}
        </span>
        {/* <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[rgb(226,168,43)] to-[rgb(184,3,124)] text-lg text-white shadow-lg shadow-orange-500/25">
            {icon}
        </div> */}
    </div>
);

const ProcessCard = ({ step, alignment = 'left' }) => (
    <div
        className={`relative rounded-2xl border border-white/15 bg-white p-6 md:p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
            alignment === 'right' ? 'sm:ml-auto sm:max-w-md' : 'sm:mr-auto sm:max-w-md'
        }`}
    >
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">{step.description}</p>
        {step.points && step.points.length > 0 && (
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {step.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange-400 to-pink-400" />
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default OurProcess;
