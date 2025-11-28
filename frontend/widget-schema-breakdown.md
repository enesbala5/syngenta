## VideoWidget

title
subtitle
description (optional)

videoUrl
autoplay
muted
loop
controls

## ImageWidget

title
src
subtitle
description (optional)

## StoryWidget

title
subtitle
slides: { title: string; content: string; imageUrl?: string }[]

## RiskProfileWidget

title
description
scores?: {
		stress?: number;
		yield?: number;
		nutrient?: number;
	};

## LocationWidget

location (coordinates)
description
subtitle
title

## HarvestWidget

title
subtitle
direction
change: {
  unit
  amount
}
progress: {
  unit
  amount
}

## ExplanationWidget

title
subtitle
steps: string[]

## ExpectedYieldWidget

direction 
title
subtitle
value: {
  unit
  amount
}
change: {
  unit
  amount
}
progress: {
  unit
  amount
}