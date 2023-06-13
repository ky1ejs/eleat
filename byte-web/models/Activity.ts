
export class Activity {
  public static SEDENTARY = new Activity("sedentary", 1.2)
  public static LIGHT = new Activity("light", 1.375)
  public static MODERATE = new Activity("moderate", 1.55)
  public static HIGH = new Activity("high", 1.725)
  public static EXCEPTIONAL = new Activity("exceptional", 1.9)

  private static VALUES: Map<string, Activity>;

  readonly id: string;
  readonly multiplier: number;

  private constructor(id: string, multiplier: number) {
    this.id = id;
    this.multiplier = multiplier;

    Activity.VALUES = Activity.VALUES || new Map<string, Activity>();
    Activity.VALUES.set(id, this);
  }

  static allValues(): Map<string, Activity> { 
    return new Map(this.VALUES)
  }
} 
