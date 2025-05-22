
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

type OnboardingCard = {
  label: string;
  link: string;
};

interface OnboardingSectionProps {
  cards: OnboardingCard[];
  checked: boolean[];
  onCheckboxChange: (idx: number, checkedVal: boolean) => void;
  onCardClick: (link: string) => void;
}

const OnboardingSection = ({
  cards,
  checked,
  onCheckboxChange,
  onCardClick,
}: OnboardingSectionProps) => (
  <div>
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 pl-2">
      Onboarding
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {cards.slice(0, 4).map((card, idx) => (
        <Card
          key={card.label}
          className="flex flex-col justify-between h-48 cursor-pointer transition-transform hover:scale-105 hover:shadow-xl bg-white/90 relative"
          onClick={() => onCardClick(card.link)}
          tabIndex={0}
          role="button"
          aria-label={card.label}
          onKeyDown={e => { if (e.key === "Enter" || e.key === " ") onCardClick(card.link); }}
        >
          <CardContent className="flex flex-col justify-between h-full pt-6 pb-2">
            <div>
              <CardTitle className="text-lg mb-2">{card.label}</CardTitle>
            </div>
            <div className="flex items-center justify-end">
              <span
                className="mr-2 text-sm text-gray-500"
                onClick={e => e.stopPropagation()}
              >
                Mark complete
              </span>
              <Checkbox
                checked={checked[idx]}
                onCheckedChange={checkedVal => {
                  onCheckboxChange(idx, Boolean(checkedVal));
                }}
                onClick={e => e.stopPropagation()}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="flex justify-center">
      {cards.length > 4 && (
        <Card
          key={cards[4].label}
          className="flex flex-col justify-between h-48 w-full max-w-md cursor-pointer transition-transform hover:scale-105 hover:shadow-xl bg-white/90 relative mt-6"
          onClick={() => onCardClick(cards[4].link)}
          tabIndex={0}
          role="button"
          aria-label={cards[4].label}
          onKeyDown={e => { if (e.key === "Enter" || e.key === " ") onCardClick(cards[4].link); }}
        >
          <CardContent className="flex flex-col justify-between h-full pt-6 pb-2">
            <div>
              <CardTitle className="text-lg mb-2">{cards[4].label}</CardTitle>
            </div>
            <div className="flex items-center justify-end">
              <span
                className="mr-2 text-sm text-gray-500"
                onClick={e => e.stopPropagation()}
              >
                Mark complete
              </span>
              <Checkbox
                checked={checked[4]}
                onCheckedChange={checkedVal => {
                  onCheckboxChange(4, Boolean(checkedVal));
                }}
                onClick={e => e.stopPropagation()}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  </div>
);

export default OnboardingSection;

