import React from "react";
import DetailsComponent from "../components/DetailsComponent";

const faqQA = [
  {
    question: "Jak założyć konto?",
    answer: "Do założenia konta wystarczy poprawnie wypełnić i wysłać formularz na stronie rejestracji."
  },
  {
    question: "Czy mogę podejść do testu więcej niż raz?",
    answer: "Każdy ma jedno podejście do testu i wynik jest ostateczny."
  },
  {
    question: "Kiedy zobaczę wynik testu?",
    answer: "Wynik końcowy testu zostanie udostępniony po tym jak wszyscy uczestnicy rozwiążą test."
  },
  {
    question: "Nie mam dostępu do testu, jak go uzyskać?",
    answer: "Dostęp do testu udziela egzaminujący. Jeśli nie widzisz u siebie testu, skontaktuj sie z prowadzącym."
  },
  {
    question: "Czy istenije tryb nauki, przed podejściem do testu?",
    answer: "Wcześniejszy wgląd do pytań jest niemożliwy. Jedyną opcją poznania pytań jest podejście to testu."
  },
  {
    question: "Nie mogę się zalogować, jak odzyskać dostęp do konta?",
    answer: "W celu odzyskania hasła skontaktuj się z administratorem strony."
  },
  {
    question: "Nie zdążyłem podejść do testu. Co teraz?",
    answer: "Skontaktuj się ze swoim prowadzącym, aby umożliwił pozaterminowe podejście do testu."
  },
  {
    question: "Czy mogę wykonać test anonimowo?",
    answer: "Aby uczestniczyć w testach konieczne jest posiadanie konta. Konto jest bezpłatne i kazdy ma możliwość jego założenia. "
  },
]

const FaqScreen = () => {
  return <section className="container mt-4">
    <h2 className="text-center">FAQ</h2>
    <p>Wkraczamy w nową erę zdalnego zaliczania zajęć. WPZ-Egzaminy to rozwijający się portal to przeprowadzania egzaminów. Pozwala prowadzącym na zarządzanie dostępem, wynikami i podejściami do wystawionych testów. Uczniowie zaś zyskują luksus zdawania egzaminów w domowym zaciszu. Poniżej kilka najczęściej zadawanych pytań.</p>

    <DetailsComponent content={faqQA}></DetailsComponent>

  </section>;
};

export default FaqScreen;
