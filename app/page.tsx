'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [writings, setWritings] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: artData } = await supabase.from("artworks").select("id, title, image_url, user_id").order("created_at", { ascending: false });
      const { data: writingData } = await supabase.from("writings").select("id, title, cover_image, user_id").order("created_at", { ascending: false });
      if (artData) setArtworks(artData);
      if (writingData) setWritings(writingData);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-12 bg-gray-100">
      <section className="text-center bg-white rounded-xl p-6 shadow">
        <h1 className="text-3xl font-bold mb-2">shieldmyart</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          아티스트들의 작품을 안전하게 보호하고 소개하는 공간입니다. 다운로드 방지, AI 러닝 차단 등 전문적인 보호 기능을 갖춘 창작자 전용 플랫폼입니다.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">🎨 최신 그림 작품</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {artworks.map((art) => (
            <Link href={`/artwork/${art.id}`} key={art.id}>
              <div className="relative group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
                <Image
                  src={art.image_url}
                  alt={art.title}
                  width={500}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition text-white flex flex-col justify-end p-3">
                  <h3 className="text-sm font-semibold truncate">{art.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">📚 최신 글 작품</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {writings.map((write) => (
            <Link href={`/writing/${write.id}`} key={write.id}>
              <div className="relative group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
                <Image
                  src={write.cover_image}
                  alt={write.title}
                  width={500}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition text-white flex flex-col justify-end p-3">
                  <h3 className="text-sm font-semibold truncate">{write.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
