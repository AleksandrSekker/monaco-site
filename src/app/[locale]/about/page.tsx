import { aboutHeaders } from '@/translations/headers';
import PageHeader from '@/components/ui/PageHeader';
import { PageDescription } from '@/components/ui';
import StatsSection from '@/components/sections/StatsSection';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';

const yuriiContent = {
  en: {
    name: 'Yurii Burba',
    title: 'Founder of Monaco Financial Solution.',
    bio: `I've lived and worked in Monaco for over 10 years, where I fully developed in the world of premium finance in the Principality.
    
    Together with my team of experienced specialists, we help our clients and family effectively integrate into the financial ecosystem.
    
    Monaco:
    • account opening at a leading bank in the Principality,
    • structuring credit lines secured by assets,
    • portfolio creation and alternative investment methods,
    • full crypto onboarding from €100,000 with full compliance with all regulations and AML requirements.
    
    We operate as a turnkey family office: I personally oversee each project, and the team - provides operational support, legal expertise, and technical assistance at every stage.
    
    Our core values are absolute confidentiality, process transparency, and tangible results for your assets in one of the most stable and reliable jurisdictions in the world.
    
    If you are ready to discuss your request, please write to us and we will find the right solution for you.`,
  },
  fr: {
    name: 'Yurii Burba',
    title: 'Fondateur de Monaco Financial Solution.',
    bio: `J'habite et je travaille à Monaco depuis plus de 10 ans, où je me suis pleinement développé dans le monde de la finance premium dans la Principauté.
    
    Avec mon équipe de spécialistes expérimentés, nous aidons nos clients et leur famille à s'intégrer efficacement dans l'écosystème financier.
    
    Monaco :
    • ouverture de compte dans une banque leader de la Principauté,
    • structuration de lignes de crédit garanties par des actifs,
    • création de portefeuille et méthodes d'investissement alternatives,
    • intégration complète des crypto-monnaies à partir de 100 000 € avec pleine conformité à toutes les réglementations et exigences LCT.
    
    Nous opérons comme un family office clé en main : je supervise personnellement chaque projet, et l'équipe - fournit un support opérationnel, une expertise juridique et une assistance technique à chaque étape.
    
    Nos valeurs fondamentales sont la confidentialité absolue, la transparence des processus et des résultats tangibles pour vos actifs dans l'une des juridictions les plus stables et fiables au monde.
    
    Si vous êtes prêt à discuter de votre demande, écrivez-nous et nous trouverons la solution qui vous convient.`,
  },
  ru: {
    name: 'Юрий Бурба',
    title: 'Основатель Monaco Financial Solution.',
    bio: `Я живу и работаю в Монако более 10 лет, где полностью развился в мире премиальных финансов Княжества.
    
    Вместе с моей командой опытных специалистов мы помогаем нашим клиентам и семьям эффективно интегрироваться в финансовую экосистему.
    
    Монако:
    • открытие счета в ведущем банке Княжества,
    • структурирование кредитных линий, обеспеченных активами,
    • создание портфолио и альтернативные методы инвестиций,
    • полное онбордингование криптовалют от €100,000 с полным соблюдением всех регуляций и требований ПОД/ФТ.
    
    Мы работаем как семейный офис под ключ: я лично контролирую каждый проект, а команда - предоставляет операционную поддержку, юридическую экспертизу и техническую помощь на каждом этапе.
    
    Наши основные ценности - абсолютная конфиденциальность, прозрачность процессов и ощутимые результаты для ваших активов в одной из самых стабильных и надежных юрисдикций в мире.
    
    Если вы готовы обсудить ваш запрос, напишите нам, и мы найдем правильное решение для вас.`,
  },
};

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const content = yuriiContent[locale];

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-6">
          <div className="space-y-5">
            <PageHeader translations={aboutHeaders} />
            <StatsSection />
            <PageDescription />
          </div>

          {/* Yurii Burba Section */}
          <div className="mt-16 space-y-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
              {/* Photo */}
              <div className="w-full lg:w-1/2">
                <div className="relative w-full aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 shadow-xl">
                  <Image
                    src="/images/yurii-burba.jpg"
                    alt={content.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">{content.name}</h2>
                  <p className="text-lg lg:text-lg font-medium text-slate-700 leading-relaxed">{content.title}</p>
                </div>

                <div className="prose prose-base lg:prose-lg max-w-none">
                  {content.bio.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-slate-600 leading-relaxed text-sm lg:text-base mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
