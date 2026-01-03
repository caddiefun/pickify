import { CheckCircle, Trophy, Calendar } from "lucide-react";

interface SupportingFact {
  label: string;
  value: string;
  winner?: string;
}

interface QuickAnswerProps {
  question: string;
  answer: string;
  supportingFacts?: SupportingFact[];
  updatedDate?: string;
  variant?: "default" | "comparison" | "review" | "best-for";
}

/**
 * QuickAnswer component for AI citation optimization.
 *
 * This component renders the first 100 words of a page in a structured,
 * extractable format that AI models can easily parse and cite.
 *
 * Usage:
 * - Hub pages: Highlight editor's choice with key differentiators
 * - Comparison pages: State winner with head-to-head facts
 * - Review pages: Summarize rating, best use cases, key strength/weakness
 * - Best-for pages: Direct answer to "best X for Y" query
 */
export function QuickAnswer({
  question,
  answer,
  supportingFacts,
  updatedDate,
  variant = "default",
}: QuickAnswerProps) {
  return (
    <div
      className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8"
      // Semantic markup for AI extraction
      itemScope
      itemType="https://schema.org/Answer"
    >
      {/* Hidden question for schema */}
      <meta itemProp="name" content={question} />

      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          {variant === "comparison" ? (
            <Trophy className="w-4 h-4 text-primary" />
          ) : (
            <CheckCircle className="w-4 h-4 text-primary" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-medium text-primary mb-1">
            Quick Answer
          </h2>
          <p
            className="text-lg font-medium text-foreground leading-relaxed"
            itemProp="text"
          >
            {answer}
          </p>
        </div>
      </div>

      {/* Supporting facts for structured extraction */}
      {supportingFacts && supportingFacts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-primary/10">
          {supportingFacts.map((fact, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                {fact.label}
              </div>
              <div className="font-semibold text-foreground">
                {fact.value}
              </div>
              {fact.winner && (
                <div className="text-xs text-primary font-medium mt-0.5">
                  {fact.winner} wins
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Freshness signal for AI */}
      {updatedDate && (
        <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-primary/10 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>Last updated: {updatedDate}</span>
        </div>
      )}
    </div>
  );
}

/**
 * Generate QuickAnswer props for a hub/vertical page
 */
export function generateHubQuickAnswer(
  verticalName: string,
  editorsChoice: { name: string; rating: number; price: number; pros: string[] },
  runnerUp: { name: string; useCase: string },
  productCount: number
): QuickAnswerProps {
  const lowestPrice = editorsChoice.price;

  return {
    question: `What is the best ${verticalName.toLowerCase()} in 2025?`,
    answer: `${editorsChoice.name} is the best ${verticalName.toLowerCase()} for most users in 2025. It scored ${editorsChoice.rating}/10 in our testing and starts at $${lowestPrice.toFixed(2)}/mo. ${editorsChoice.pros[0]}. ${runnerUp.name} is better if you need ${runnerUp.useCase}.`,
    supportingFacts: [
      { label: "Top Pick", value: editorsChoice.name },
      { label: "Rating", value: `${editorsChoice.rating}/10` },
      { label: "From", value: `$${lowestPrice.toFixed(2)}/mo` },
      { label: "Tested", value: `${productCount} products` },
    ],
    updatedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    variant: "default",
  };
}

/**
 * Generate QuickAnswer props for a comparison page
 */
export function generateComparisonQuickAnswer(
  productA: { name: string; rating: number; price: number },
  productB: { name: string; rating: number; price: number },
  winner: "A" | "B",
  winnerReason: string,
  loserAdvantage: string
): QuickAnswerProps {
  const winnerProduct = winner === "A" ? productA : productB;
  const loserProduct = winner === "A" ? productB : productA;

  return {
    question: `Is ${productA.name} or ${productB.name} better?`,
    answer: `${winnerProduct.name} beats ${loserProduct.name} for most users. ${winnerReason}. Choose ${loserProduct.name} if you need ${loserAdvantage}.`,
    supportingFacts: [
      { label: "Rating", value: `${productA.rating} vs ${productB.rating}`, winner: productA.rating > productB.rating ? productA.name : productB.name },
      { label: "Price", value: `$${productA.price} vs $${productB.price}`, winner: productA.price < productB.price ? productA.name : productB.name },
    ],
    updatedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    variant: "comparison",
  };
}

/**
 * Generate QuickAnswer props for a product review page
 */
export function generateReviewQuickAnswer(
  product: { name: string; rating: number; price: number; pros: string[]; cons: string[] },
  bestFor: string[]
): QuickAnswerProps {
  return {
    question: `Is ${product.name} worth it in 2025?`,
    answer: `${product.name} scores ${product.rating}/10 in our testing. It's best for ${bestFor.slice(0, 2).join(" and ")}. Key strength: ${product.pros[0]}. Main weakness: ${product.cons[0]}.`,
    supportingFacts: [
      { label: "Rating", value: `${product.rating}/10` },
      { label: "Starting Price", value: `$${product.price.toFixed(2)}/mo` },
      { label: "Best For", value: bestFor[0] },
    ],
    updatedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    variant: "review",
  };
}

/**
 * Generate QuickAnswer props for a best-for page
 */
export function generateBestForQuickAnswer(
  verticalName: string,
  useCase: string,
  winner: { name: string; rating: number; reason: string },
  alternativeCount: number
): QuickAnswerProps {
  return {
    question: `What is the best ${verticalName.toLowerCase()} for ${useCase}?`,
    answer: `${winner.name} is the best ${verticalName.toLowerCase()} for ${useCase} in 2025. It scored ${winner.rating}/10 in our testing. ${winner.reason}. We tested ${alternativeCount} alternatives.`,
    supportingFacts: [
      { label: "Top Pick", value: winner.name },
      { label: "Rating", value: `${winner.rating}/10` },
      { label: "Use Case", value: useCase },
      { label: "Alternatives", value: `${alternativeCount - 1} others` },
    ],
    updatedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    variant: "best-for",
  };
}

/**
 * Generate QuickAnswer props for ISP state page
 */
export function generateStateQuickAnswer(
  stateName: string,
  topProvider: { name: string; rating: number; description: string },
  providerCount: number,
  fiberCount: number
): QuickAnswerProps {
  return {
    question: `What is the best internet provider in ${stateName}?`,
    answer: `${topProvider.name} is the best internet provider in ${stateName} with a ${topProvider.rating}/10 rating. ${topProvider.description}. ${providerCount} total providers serve ${stateName}${fiberCount > 0 ? `, including ${fiberCount} fiber options` : ""}.`,
    supportingFacts: [
      { label: "Top Provider", value: topProvider.name },
      { label: "Rating", value: `${topProvider.rating}/10` },
      { label: "Total ISPs", value: `${providerCount}` },
      { label: "Fiber ISPs", value: `${fiberCount}` },
    ],
    updatedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    variant: "default",
  };
}

/**
 * Generate QuickAnswer props for ISP city page
 */
export function generateCityQuickAnswer(
  cityName: string,
  stateName: string,
  topProvider: { name: string; rating: number },
  providerCount: number,
  fiberAvailable: boolean
): QuickAnswerProps {
  return {
    question: `What is the best internet provider in ${cityName}, ${stateName}?`,
    answer: `${topProvider.name} is our top recommendation for ${cityName} with a ${topProvider.rating}/10 rating. ${providerCount} internet providers serve ${cityName}${fiberAvailable ? ", including fiber options" : ""}. Enter your zip code above for exact availability at your address.`,
    supportingFacts: [
      { label: "Top Pick", value: topProvider.name },
      { label: "Rating", value: `${topProvider.rating}/10` },
      { label: "Providers", value: `${providerCount}` },
      { label: "Fiber", value: fiberAvailable ? "Available" : "Limited" },
    ],
    updatedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    variant: "default",
  };
}
