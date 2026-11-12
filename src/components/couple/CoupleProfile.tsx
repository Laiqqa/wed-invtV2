import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import { PerchedButterfly } from '../common/PerchedButterfly';
import { Text3DMotion } from '../common/Text3DMotion';

export const CoupleProfile: React.FC = () => {
  const { groom, bride } = weddingData.couple;

  return (
    <section id="mempelai" className="py-6 sm:py-8 px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-10">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-linen-600">
          The Bride &amp; Groom
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-noir-900 font-normal">
          Dua Hati yang Dipertemukan
        </h2>
        <div className="w-12 h-0.5 bg-primary mx-auto mt-4" />
        <p className="text-sm text-noir-700 leading-relaxed pt-2">
          Dengan penuh rasa syukur dan memohon rahmat serta ridho Tuhan Yang Maha Esa, kami bermaksud mengikrarkan janji suci pernikahan kami.
        </p>
      </div>

      {/* Relative Container with Central Love Emblem */}
      <div className="relative">
        {/* Desktop Center Love Medallion */}
        <div className="hidden md:flex absolute left-1/2 top-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center z-20 pointer-events-none">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/30 to-primary/80" />
          
          <motion.div
            animate={{
              scale: [1, 1.16, 1, 1.1, 1],
              rotate: [0, -3, 3, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative my-2.5"
          >
            {/* Ambient Heart Halo */}
            <div className="absolute inset-0 rounded-full bg-primary/25 blur-md animate-pulse" />
            
            <div className="relative w-14 h-14 rounded-full bg-linen-100 border-2 border-primary/50 shadow-xl flex flex-col items-center justify-center text-primary">
              <Heart className="w-7 h-7 fill-primary text-primary drop-shadow-sm" />
            </div>
          </motion.div>

          <span className="font-serif italic text-xs text-primary font-bold tracking-widest mt-1">
            &amp;
          </span>
          <div className="w-px h-16 bg-gradient-to-t from-transparent via-primary/30 to-primary/80" />
        </div>

        {/* Grid: Groom & Bride */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        {/* The Groom Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center group"
        >
          {/* Portrait Frame with Physical Editorial Border */}
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl p-2 bg-linen-100 border border-linen-300 shadow-paper-lg transition-transform duration-500 group-hover:-translate-y-1">
            {/* Resting Vintage Butterfly on Tom's Frame */}
            <PerchedButterfly color="antique-gold" size={28} rotation={-18} className="-top-3.5 -left-3" />

            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img
                src={groom.photo}
                alt={groom.fullName}
                className="w-full h-full object-cover contrast-105 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
                width={288}
                height={384}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-900/60 via-transparent to-transparent opacity-60" />
              <span className="absolute bottom-3 left-3 bg-linen-100/90 backdrop-blur-sm text-noir-800 font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded">
                The Groom
              </span>
            </div>
          </div>

          {/* Groom Details */}
          <div className="mt-6 space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl text-noir-900 font-normal">
              {groom.fullName}
            </h3>
            <p className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
              The Groom
            </p>
            <p className="text-xs text-noir-700 max-w-xs mx-auto leading-relaxed">
              {groom.parentNames}
            </p>
            <p className="text-xs italic text-linen-600 max-w-xs mx-auto pt-1 font-serif">
              "{groom.bio}"
            </p>
            {groom.instagram && (
              <a
                href={`https://instagram.com/${groom.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-linen-700 hover:text-primary font-mono transition-colors pt-2"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@{groom.instagram}</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Mobile Center Love Connector */}
        <div className="flex md:hidden items-center justify-center gap-3 my-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-primary/60" />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-11 h-11 rounded-full bg-linen-100 border border-primary/40 shadow-md flex items-center justify-center text-primary"
          >
            <Heart className="w-5 h-5 fill-primary text-primary" />
          </motion.div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/30 to-primary/60" />
        </div>

        {/* The Bride Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center text-center group"
        >
          {/* Portrait Frame with Physical Editorial Border */}
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl p-2 bg-linen-100 border border-linen-300 shadow-paper-lg transition-transform duration-500 group-hover:-translate-y-1">
            {/* Resting Vintage Butterfly on Zendaya's Frame */}
            <PerchedButterfly color="dusty-rose" size={30} rotation={22} className="-top-3.5 -right-3" />

            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img
                src={bride.photo}
                alt={bride.fullName}
                className="w-full h-full object-cover contrast-105 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
                width={288}
                height={384}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-900/60 via-transparent to-transparent opacity-60" />
              <span className="absolute bottom-3 left-3 bg-linen-100/90 backdrop-blur-sm text-noir-800 font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded">
                The Bride
              </span>
            </div>
          </div>

          {/* Bride Details */}
          <div className="mt-6 space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl text-noir-900 font-normal">
              {bride.fullName}
            </h3>
            <p className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
              The Bride
            </p>
            <p className="text-xs text-noir-700 max-w-xs mx-auto leading-relaxed">
              {bride.parentNames}
            </p>
            <p className="text-xs italic text-linen-600 max-w-xs mx-auto pt-1 font-serif">
              "{bride.bio}"
            </p>
            {bride.instagram && (
              <a
                href={`https://instagram.com/${bride.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-linen-700 hover:text-primary font-mono transition-colors pt-2"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@{bride.instagram}</span>
              </a>
            )}
          </div>
        </motion.div>
        </div>
      </div>

      {/* Quote Banner in Warm Atelier Box with 3D Word Motion */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-8 sm:mt-10 p-6 sm:p-8 bg-linen-100 border border-linen-300/80 rounded-2xl text-center relative max-w-2xl mx-auto shadow-paper"
      >
        <Text3DMotion
          text={weddingData.quote.text}
          className="font-serif italic text-base sm:text-lg text-noir-800 leading-relaxed"
          highlightWords={['world', 'smile', 'hold', 'love', 'die']}
          highlightClass="text-primary font-semibold"
        />
        <div className="mt-3 text-xs font-mono text-primary uppercase tracking-widest">
          — {weddingData.quote.source}
        </div>
      </motion.div>
    </section>
  );
};
