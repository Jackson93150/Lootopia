"use client";

import React from "react";

type TermsModalProps = {
    onAccept: () => void;
    onDecline: () => void;
};

export default function TermsModal({ onAccept, onDecline }: TermsModalProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white text-dark-brown rounded-xl p-6 w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold mb-4">Conditions d’utilisation</h2>
                <p className="text-sm mb-6">
                    En acceptant, vous confirmez avoir lu et accepté les conditions
                    d’utilisation de notre service. Ce texte est générique. Vous pouvez le modifier.
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onDecline}
                        className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
                    >
                        Refuser
                    </button>
                    <button
                        onClick={onAccept}
                        className="px-4 py-2 text-sm rounded-md bg-orange text-white hover:bg-orange-600"
                    >
                        Accepter
                    </button>
                </div>
            </div>
        </div>
    );
}
