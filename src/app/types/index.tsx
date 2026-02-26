import { z } from 'zod';

export const UserTypeEnum = z.enum(['SOMMELIER', 'ENTHUSIAST']);
export const VerificationStatusEnum = z.enum(['PENDING', 'VERIFIED', 'REJECTED']);
export const ExpertiseLevelEnum = z.enum(['INICIANTE', 'INTERMEDIARIO', 'AVANCADO', 'EXPERT']);
export const WineTypeEnum = z.enum(['RED', 'WHITE', 'ROSE', 'SPARKLING', 'FORTIFIED']);
export const WineStatusEnum = z.enum(['ACTIVE', 'PENDING_REVIEW', 'MERGED']);
export const TastingStatusEnum = z.enum(['DRAFT', 'PUBLISHED']);
export const PrivacyLevelEnum = z.enum(['PUBLIC', 'FOLLOWERS_ONLY', 'PRIVATE']);
export const SubmissionStatusEnum = z.enum(['PENDING', 'APPROVED', 'REJECTED']);

// Visual Analysis Enums
export const ColorIntensityEnum = z.enum(['PALE', 'MEDIUM', 'DEEP']);
export const ClarityEnum = z.enum(['BRILLIANT', 'CLEAR', 'HAZY', 'CLOUDY']);
export const ViscosityEnum = z.enum(['LIGHT', 'MEDIUM', 'HEAVY']);
export const BubbleSizeEnum = z.enum(['FINE', 'MEDIUM', 'COARSE']);
export const BubblePersistenceEnum = z.enum(['SHORT', 'MEDIUM', 'LONG']);

// Olfactory Analysis Enums
export const AromaIntensityEnum = z.enum(['LIGHT', 'MEDIUM', 'PRONOUNCED']);
export const WineConditionEnum = z.enum(['CLEAN', 'FAULTY']);

// Gustatory Analysis Enums
export const SweetnessEnum = z.enum(['DRY', 'OFF_DRY', 'MEDIUM_SWEET', 'SWEET']);
export const AcidityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'VIBRANT']);
export const TanninsEnum = z.enum(['SILKY', 'VELVETY', 'FIRM', 'ASTRINGENT']);
export const BodyEnum = z.enum(['LIGHT', 'MEDIUM', 'FULL']);
export const AlcoholIntegrationEnum = z.enum(['INTEGRATED', 'NOTICEABLE', 'HOT']);
export const FinishEnum = z.enum(['SHORT', 'MEDIUM', 'LONG']);
export const BalanceEnum = z.enum(['UNBALANCED', 'BALANCED', 'EXCEPTIONAL']);


// User Schema
export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string().min(1),
  userType: UserTypeEnum,
  verificationStatus: VerificationStatusEnum.nullable().optional(),
  certificationUrl: z.url().nullable().optional(),
  expertiseLevel: ExpertiseLevelEnum.nullable().optional(),
  profileImageUrl: z.url().nullable().optional(),
  bio: z.string().nullable().optional(),
  tastingCount: z.number().int().nonnegative().default(0),
  followerCount: z.number().int().nonnegative().default(0),
  followingCount: z.number().int().nonnegative().default(0),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable().optional(),
});

// Wine Schema
export const WineSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  producer: z.string().min(1),
  region: z.string().nullable().optional(),
  country: z.string().min(1),
  denomination: z.string().nullable().optional(),
  wineType: WineTypeEnum,
  grapeVarieties: z.array(z.string()),
  vintage: z.number().int().nullable().optional(),
  alcoholContent: z.number().nullable().optional(),
  averagePrice: z.number().nullable().optional(),
  status: WineStatusEnum.default('ACTIVE'),
  imageUrl: z.string().url().nullable().optional(),
  sensoryProfile: z.record(z.string(), z.unknown()).nullable().optional(),
  sommelierAvgScore: z.number().nullable().optional(),
  sommelierScoreCount: z.number().int().nonnegative().default(0),
  enthusiastAvgScore: z.number().nullable().optional(),
  enthusiastScoreCount: z.number().int().nonnegative().default(0),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

// Visual Analysis Schema
export const VisualAnalysisSchema = z.object({
  id: z.uuid(),
  tastingId: z.uuid(),
  colorIntensity: ColorIntensityEnum,
  colorTone: z.string(),
  colorReflections: z.array(z.string()),
  clarity: ClarityEnum,
  viscosity: ViscosityEnum,
  bubbleSize: BubbleSizeEnum.nullable().optional(),
  bubblePersistence: BubblePersistenceEnum.nullable().optional(),
});

// Olfactory Analysis Schema
export const OlfactoryAnalysisSchema = z.object({
  id: z.uuid(),
  tastingId: z.uuid(),
  intensity: AromaIntensityEnum,
  primaryAromas: z.array(z.string()),
  secondaryAromas: z.array(z.string()),
  tertiaryAromas: z.array(z.string()),
  condition: WineConditionEnum,
  faultNotes: z.string().nullable().optional(),
});

// Gustatory Analysis Schema
export const GustatoryAnalysisSchema = z.object({
  id: z.uuid(),
  tastingId: z.uuid(),
  sweetness: SweetnessEnum,
  acidity: AcidityEnum,
  tannins: TanninsEnum.nullable().optional(),
  body: BodyEnum,
  alcoholIntegration: AlcoholIntegrationEnum,
  finish: FinishEnum,
  balance: BalanceEnum,
});

// Tasting Schema
export const TastingSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  wineId: z.uuid(),
  status: TastingStatusEnum.default('DRAFT'),
  privacyLevel: PrivacyLevelEnum.default('PUBLIC'),
  score: z.number().int().min(0).max(100).nullable().optional(),
  pairings: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
  likeCount: z.number().int().nonnegative().default(0),
  commentCount: z.number().int().nonnegative().default(0),
  publishedAt: z.iso.datetime().nullable().optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
//   user: UserSchema.optional(),
//   wine: WineSchema.optional(),
//   visualAnalysis: VisualAnalysisSchema.nullable().optional(),
//   olfactoryAnalysis: OlfactoryAnalysisSchema.nullable().optional(),
//   gustatoryAnalysis: GustatoryAnalysisSchema.nullable().optional(),
});

// Follow Schema
export const FollowSchema = z.object({
  followerId: z.uuid(),
  followingId: z.uuid(),
  createdAt: z.iso.datetime(),
  follower: UserSchema.optional(),
  following: UserSchema.optional(),
});

// Like Schema
export const LikeSchema = z.object({
  userId: z.uuid(),
  tastingId: z.uuid(),
  createdAt: z.iso.datetime(),
  user: UserSchema.optional(),
  tasting: TastingSchema.optional(),
});

// Comment Schema
export const CommentSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  tastingId: z.uuid(),
  content: z.string().min(1),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable().optional(),
  user: UserSchema.optional(),
  tasting: TastingSchema.optional(),
});

// Collection Schema
export const CollectionSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  isDefault: z.boolean().default(false),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  user: UserSchema.optional(),
});

// Collection Item Schema
export const CollectionItemSchema = z.object({
  collectionId: z.uuid(),
  tastingId: z.uuid(),
  addedAt: z.iso.datetime(),
  collection: CollectionSchema.optional(),
  tasting: TastingSchema.optional(),
});

// Badge Schema
export const BadgeSchema = z.object({
  id: z.uuid(),
  code: z.string(),
  name: z.string(),
  description: z.string(),
  iconUrl: z.url().nullable().optional(),
  criteria: z.record(z.string(), z.unknown()),
  createdAt: z.iso.datetime(),
});

// User Badge Schema
export const UserBadgeSchema = z.object({
  userId: z.uuid(),
  badgeId: z.uuid(),
  earnedAt: z.iso.datetime(),
  user: UserSchema.optional(),
  badge: BadgeSchema.optional(),
});

// Wine Submission Schema
export const WineSubmissionSchema = z.object({
  id: z.uuid(),
  submittedById: z.uuid(),
  wineData: z.record(z.string(), z.unknown()),
  labelImageUrl: z.url().nullable().optional(),
  status: SubmissionStatusEnum.default('PENDING'),
  reviewedById: z.uuid().nullable().optional(),
  reviewNote: z.string().nullable().optional(),
  createdWineId: z.uuid().nullable().optional(),
  createdAt: z.iso.datetime(),
  reviewedAt: z.iso.datetime().nullable().optional(),
  submittedBy: UserSchema.optional(),
  reviewedBy: UserSchema.nullable().optional(),
});

// Refresh Token Schema
export const RefreshTokenSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  tokenHash: z.string(),
  expiresAt: z.iso.datetime(),
  createdAt: z.iso.datetime(),
  revokedAt: z.iso.datetime().nullable().optional(),
});

export const CreateTastingSchema = z.object({
  wineId: z.uuid(),
  status: TastingStatusEnum.optional(),
  privacyLevel: PrivacyLevelEnum.optional(),
  score: z.number().int().min(0).max(100).optional(),
  pairings: z.string().optional(),
  comment: z.string().optional(),
});

export const CreateVisualAnalysisSchema = VisualAnalysisSchema.omit({ id: true });
export const CreateOlfactoryAnalysisSchema = OlfactoryAnalysisSchema.omit({ id: true });
export const CreateGustatoryAnalysisSchema = GustatoryAnalysisSchema.omit({ id: true });

export const CreateCommentSchema = z.object({
  tastingId: z.uuid(),
  content: z.string().min(1, 'Comment content is required'),
});

export const CreateCollectionSchema = z.object({
  name: z.string().min(1, 'Collection name is required'),
  description: z.string().optional(),
});

export const CreateWineSubmissionSchema = z.object({
  wineData: z.record(z.string(), z.unknown()),
  labelImageUrl: z.url().optional(),
});

// Feed Response Schema
export const FeedResponseSchema = z.object({
  tastings: z.array(TastingSchema),
  nextCursor: z.string().optional(),
  hasMore: z.boolean(),
});


export type UserType = z.infer<typeof UserTypeEnum>;
export type VerificationStatus = z.infer<typeof VerificationStatusEnum>;
export type ExpertiseLevel = z.infer<typeof ExpertiseLevelEnum>;
export type WineType = z.infer<typeof WineTypeEnum>;
export type WineStatus = z.infer<typeof WineStatusEnum>;
export type TastingStatus = z.infer<typeof TastingStatusEnum>;
export type PrivacyLevel = z.infer<typeof PrivacyLevelEnum>;
export type SubmissionStatus = z.infer<typeof SubmissionStatusEnum>;
export type ColorIntensity = z.infer<typeof ColorIntensityEnum>;
export type Clarity = z.infer<typeof ClarityEnum>;
export type Viscosity = z.infer<typeof ViscosityEnum>;
export type BubbleSize = z.infer<typeof BubbleSizeEnum>;
export type BubblePersistence = z.infer<typeof BubblePersistenceEnum>;
export type AromaIntensity = z.infer<typeof AromaIntensityEnum>;
export type WineCondition = z.infer<typeof WineConditionEnum>;
export type Sweetness = z.infer<typeof SweetnessEnum>;
export type Acidity = z.infer<typeof AcidityEnum>;
export type Tannins = z.infer<typeof TanninsEnum>;
export type Body = z.infer<typeof BodyEnum>;
export type AlcoholIntegration = z.infer<typeof AlcoholIntegrationEnum>;
export type Finish = z.infer<typeof FinishEnum>;
export type Balance = z.infer<typeof BalanceEnum>;

export type User = z.infer<typeof UserSchema>;
export type Wine = z.infer<typeof WineSchema>;
export type Tasting = z.infer<typeof TastingSchema>;
export type VisualAnalysis = z.infer<typeof VisualAnalysisSchema>;
export type OlfactoryAnalysis = z.infer<typeof OlfactoryAnalysisSchema>;
export type GustatoryAnalysis = z.infer<typeof GustatoryAnalysisSchema>;
export type Follow = z.infer<typeof FollowSchema>;
export type Like = z.infer<typeof LikeSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type Collection = z.infer<typeof CollectionSchema>;
export type CollectionItem = z.infer<typeof CollectionItemSchema>;
export type Badge = z.infer<typeof BadgeSchema>;
export type UserBadge = z.infer<typeof UserBadgeSchema>;
export type WineSubmission = z.infer<typeof WineSubmissionSchema>;
export type RefreshToken = z.infer<typeof RefreshTokenSchema>;

export type CreateTastingInput = z.infer<typeof CreateTastingSchema>;
export type CreateVisualAnalysisInput = z.infer<typeof CreateVisualAnalysisSchema>;
export type CreateOlfactoryAnalysisInput = z.infer<typeof CreateOlfactoryAnalysisSchema>;
export type CreateGustatoryAnalysisInput = z.infer<typeof CreateGustatoryAnalysisSchema>;
export type CreateCommentInput = z.infer<typeof CreateCommentSchema>;
export type CreateCollectionInput = z.infer<typeof CreateCollectionSchema>;
export type CreateWineSubmissionInput = z.infer<typeof CreateWineSubmissionSchema>;
export type FeedResponse = z.infer<typeof FeedResponseSchema>;

export const validateUser = (data: unknown): User | null => {
  const result = UserSchema.safeParse(data);
  return result.success ? result.data : null;
};

export const validateWine = (data: unknown): Wine | null => {
  const result = WineSchema.safeParse(data);
  return result.success ? result.data : null;
};

export const validateTasting = (data: unknown): Tasting | null => {
  const result = TastingSchema.safeParse(data);
  return result.success ? result.data : null;
};

export const validateComment = (data: unknown): Comment | null => {
  const result = CommentSchema.safeParse(data);
  return result.success ? result.data : null;
};

export const validateCreateTasting = (data: unknown): CreateTastingInput | null => {
  const result = CreateTastingSchema.safeParse(data);
  return result.success ? result.data : null;
};
