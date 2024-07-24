import React from "react";
import Image from 'next/image';

const AboutAppPage = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* ヒーローセクション */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <Image
                    src="/hero-image.jpg"
                    alt="教室の席替えイメージ"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-6xl font-bold mb-4">セキガエマシン</h1>
                    <p className="text-2xl">教育現場に革命を起こす全自動席替えアプリ</p>
                </div>
            </section>

            {/* 主要機能セクション */}
            <section className="py-20 px-4 max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16">革新的な機能</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">ワンクリックで全自動席替え</h3>
                        <p className="text-lg text-gray-600">条件を入力し、ボタンをクリックするだけで、瞬時に最適な席替えが完了します。人間以上の正確さで教育的配慮を反映します。</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">革新的な保存機能</h3>
                        <p className="text-lg text-gray-600">席替えの結果と条件を保存でき、次回はボタン一つで呼び出せます。2回目以降の席替えは、クリック一つで完了します。</p>
                    </div>
                </div>
            </section>

            {/* 詳細説明セクション */}
            <section className="bg-gray-100 py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-8">教育現場の課題を解決</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        30名以上の生徒がいる学級で、教育的配慮を行いながら席替えを行うのは、教師にとって大きな負担です。年10回以上も行われるこの作業は、もはや人間の頭脳だけでは限界があります。
                    </p>
                    <p className="text-lg text-gray-600 mb-8">
                        セキガエマシンは、教師の席替え作業の負担を驚異の1/100に削減します。この革新的なツールが、教育現場に新たな風を吹き込み、教師の皆様により多くの時間と自由をもたらします。
                    </p>
                </div>
            </section>

            {/* CTAセクション */}
            <section className="py-20 px-4 text-center">
                <h2 className="text-4xl font-bold mb-8">教育革命の一翼を担いませんか？</h2>
                <p className="text-xl mb-12">全国の教師の皆様、ぜひセキガエマシンをお試しください。</p>
                <a href="/" className="bg-[#6FBDBF] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#5FA9AB] transition-colors">
                    今すぐ始める
                </a>
            </section>
        </div>
    );
}

export default AboutAppPage;