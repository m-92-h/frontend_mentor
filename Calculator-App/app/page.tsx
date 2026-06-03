"use client";

import { useState, useEffect } from "react";

type Theme = "theme1" | "theme2" | "theme3";
type Operator = "+" | "-" | "x" | "/" | null;

export default function CalculatorPage() {
    const [display, setDisplay] = useState<string>("0");
    const [firstOperand, setFirstOperand] = useState<number | null>(null);
    const [operator, setOperator] = useState<Operator>(null);
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === "undefined") return "theme1";
        return (localStorage.getItem("calc-theme") as Theme) ?? "theme1";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("calc-theme", theme);
    }, [theme]);

    const inputDigit = (digit: number): void => {
        if (waitingForSecondOperand) {
            setDisplay(String(digit));
            setWaitingForSecondOperand(false);
        } else {
            setDisplay(display === "0" ? String(digit) : display + digit);
        }
    };

    const inputDecimal = (): void => {
        if (!display.includes(".")) {
            setDisplay(display + ".");
        }
    };

    const clearAll = (): void => {
        setDisplay("0");
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    };

    const deleteLast = (): void => {
        setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
    };

    const calculate = (first: number, second: number, op: Operator): number => {
        if (op === "+") return first + second;
        if (op === "-") return first - second;
        if (op === "x") return first * second;
        if (op === "/") return first / second;
        return second;
    };

    const performCalculation = (nextOperator: Operator): void => {
        const inputValue = parseFloat(display);

        if (firstOperand === null) {
            setFirstOperand(inputValue);
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            setDisplay(String(result));
            setFirstOperand(result);
        }

        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
    };

    const handleEquals = (): void => {
        if (!operator || waitingForSecondOperand) return;
        const result = calculate(firstOperand!, parseFloat(display), operator);
        setDisplay(String(result));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    };

    const keys: (number | string)[] = [7, 8, 9, "DEL", 4, 5, 6, "+", 1, 2, 3, "-", ".", 0, "/", "x"];

    return (
        <div className="bg-main-bg min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-300">
            <div className="w-full max-w-135 flex flex-col gap-6">
                {/* Header */}
                <header className="flex justify-between items-end text-text-main px-1">
                    <h1 className="text-4xl font-bold cursor-default">calc</h1>
                    <div className="flex items-end gap-6">
                        <span className="text-[12px] tracking-[0.2em] mb-2 font-bold cursor-default">THEME</span>
                        <div className="w-20">
                            <div className="flex justify-around text-[12px] mb-1 px-2 font-bold">
                                {(["theme1", "theme2", "theme3"] as Theme[]).map((t, i) => (
                                    <span key={t} onClick={() => setTheme(t)} className="cursor-pointer">
                                        {i + 1}
                                    </span>
                                ))}
                            </div>
                            <div
                                className="w-20 h-7 bg-keypad-bg rounded-full relative p-1 cursor-pointer flex items-center"
                                onClick={() => setTheme(theme === "theme1" ? "theme2" : theme === "theme2" ? "theme3" : "theme1")}
                            >
                                <div
                                    className={`h-4 w-4 rounded-full bg-key-accent absolute transition-all duration-300
                                        ${theme === "theme1" ? "left-1" : ""}
                                        ${theme === "theme2" ? "left-1/2 -translate-x-1/2" : ""}
                                        ${theme === "theme3" ? "right-1" : ""}
                                    `}
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Display */}
                <div className="bg-screen-bg text-text-main text-right p-4 md:p-6 rounded-xl text-3xl md:text-4xl font-bold h-20 md:h-24 flex items-center justify-end overflow-hidden break-all">
                    {Number(display).toLocaleString("en-US", { maximumFractionDigits: 3 })}
                </div>

                {/* Keypad */}
                <div className="bg-keypad-bg p-4 md:p-6 rounded-xl grid grid-cols-4 gap-2 md:gap-4">
                    {keys.map((key) => (
                        <button
                            key={key}
                            onClick={() => {
                                if (typeof key === "number") inputDigit(key);
                                else if (key === ".") inputDecimal();
                                else if (key === "DEL") deleteLast();
                                else performCalculation(key as Operator);
                            }}
                            className={`h-10 md:h-12 rounded-lg text-xl md:text-2xl pt-2 flex items-center justify-center transition-all active:scale-95 shadow-[0_4px_0_0] cursor-pointer
                                ${
                                    key === "DEL"
                                        ? "bg-key-func text-text-alt text-xl shadow-key-func-shadow hover:brightness-150"
                                        : "bg-key-num text-text-secondary shadow-key-num-shadow hover:brightness-110"
                                }`}
                        >
                            {key}
                        </button>
                    ))}

                    <button
                        onClick={clearAll}
                        className="col-span-2 h-10 md:h-12 bg-key-func text-text-alt rounded-lg text-xl pt-1 shadow-[0_4px_0_0] shadow-key-func-shadow hover:brightness-150 cursor-pointer"
                    >
                        RESET
                    </button>
                    <button
                        onClick={handleEquals}
                        className="col-span-2 h-10 md:h-12 bg-key-accent text-text-alt rounded-lg text-xl pt-1 shadow-[0_4px_0_0] shadow-key-accent-shadow hover:brightness-125 cursor-pointer"
                    >
                        =
                    </button>
                </div>
            </div>
        </div>
    );
}
