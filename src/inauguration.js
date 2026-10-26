// Atualizações diárias da inauguração.
// O texto muda sozinho a cada dia (horário de Brasília). Para escrever o aviso de um dia
// específico sem mexer no código, edite public/inauguracao.json: { "2026-10-28": "Seu texto" }.
import { useEffect, useState } from 'react';
import { OPENING_DATE } from './config';

const TZ_OFFSET_H = -3;
const OPENING_DOORS_H = 5;
const PARTY_H = 17;
const PARTY_END_H = 22;

// Dicas que se revezam um por dia antes da inauguração (só fatos já divulgados pela academia)
const DAILY_TIPS = [
  'No dia 03/11 a nova estrutura abre as portas a partir das 5h.',
  'A festa de inauguração começa às 17h do dia 03/11. Chama a galera!',
  'Ambiente totalmente climatizado e equipe que monta o treino em cima do seu objetivo.',
  'Agende sua aula experimental grátis e seja um dos primeiros a treinar na estrutura nova.',
  'Instrutores pós-graduados em Personal Training te esperando na nova Bem Estar.',
];

export const gymNow = (ms = Date.now()) => {
  const d = new Date(ms + TZ_OFFSET_H * 3600000);
  return {
    key: d.toISOString().slice(0, 10),
    hour: d.getUTCHours() + d.getUTCMinutes() / 60,
    dayIndex: Math.floor(d.getTime() / 86400000),
  };
};

const openingDay = () => {
  const d = new Date(OPENING_DATE.getTime() + TZ_OFFSET_H * 3600000);
  return { key: d.toISOString().slice(0, 10), dayIndex: Math.floor(d.getTime() / 86400000) };
};

const fmtDate = (key) => {
  const [, m, d] = key.split('-');
  return `${d}/${m}`;
};

export function buildUpdate(now, manual) {
  const open = openingDay();
  const daysLeft = open.dayIndex - now.dayIndex;
  const base = { daysLeft, dateLabel: fmtDate(now.key) };

  let update;
  if (daysLeft > 1) {
    update = {
      phase: 'before',
      badge: `Faltam ${daysLeft} dias`,
      title: `Faltam ${daysLeft} dias para a nova Bem Estar`,
      message: DAILY_TIPS[now.dayIndex % DAILY_TIPS.length],
    };
  } else if (daysLeft === 1) {
    update = {
      phase: 'eve',
      badge: 'É amanhã!',
      title: 'A inauguração é amanhã!',
      message: 'Amanhã (03/11) abrimos às 5h e a festa de inauguração começa às 17h.',
    };
  } else if (daysLeft === 0) {
    if (now.hour < OPENING_DOORS_H) {
      update = { phase: 'today', badge: 'É hoje!', title: 'É hoje!', message: 'A nova estrutura abre às 5h. Festa de inauguração às 17h.' };
    } else if (now.hour < PARTY_H) {
      update = { phase: 'today', badge: 'É hoje!', title: 'É hoje! Já estamos abertos', message: 'Venha treinar na estrutura nova. A festa de inauguração começa às 17h.' };
    } else if (now.hour < PARTY_END_H) {
      update = { phase: 'party', badge: 'Acontecendo agora', title: 'A festa de inauguração está rolando!', message: 'Ainda dá tempo de chegar e conhecer a nova Bem Estar.' };
    } else {
      update = { phase: 'party', badge: 'Inaugurada hoje', title: 'A nova Bem Estar foi inaugurada!', message: 'Obrigado a todo mundo que veio. Amanhã cedo tem treino na estrutura nova!' };
    }
  } else {
    const since = -daysLeft;
    update = {
      phase: 'after',
      badge: since <= 30 ? `Inaugurada há ${since} ${since === 1 ? 'dia' : 'dias'}` : 'Nova estrutura',
      title: 'A nova Bem Estar está de portas abertas',
      message: 'Mais espaço, mais equipamentos e o mesmo cuidado. Venha conhecer com uma aula experimental grátis.',
    };
  }

  if (manual) update = { ...update, message: manual, manual: true };
  return { ...base, ...update };
}

export function useInauguration() {
  const [now, setNow] = useState(() => gymNow());
  const [manual, setManual] = useState({});

  // Atualiza a cada minuto: troca de dia e fases do dia da festa sem recarregar a página
  useEffect(() => {
    const id = setInterval(() => setNow(() => gymNow()), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch('/inauguracao.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => setManual(data && typeof data === 'object' ? data : {}))
      .catch(() => {});
  }, [now.key]);

  return buildUpdate(now, manual[now.key]);
}
