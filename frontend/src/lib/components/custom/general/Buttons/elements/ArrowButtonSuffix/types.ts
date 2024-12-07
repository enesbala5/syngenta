export type ArrowContainerType = 'topRotated' | 'bottomRotated' | 'middleLine' | 'overlapFix' | 'container';

export type ClassNamesOverrides = { [key in ArrowContainerType]?: string | undefined };
