class Esercizio1 {
	public static void main(String args[]){

		System.out.println("Primo Esercizio:");
		int a=5,b=3;
		double r1 = (a / b);

		System.out.println(r1 + "\n" + "Secondo Esercizio: ");
		char c = 'a';
		short s = 5000;
		int r2 = (c * s);

		System.out.println(r2 + "\n" + "Terzo Esercizio: ");
		int i = 6;
		float f = 3.14F;
		double r3 = i + f;

		System.out.println(r3 + "\n" + "Quarto Esercizio: ");
		double r4 = (r1 - r2 - r3);
		System.out.println(r4);
	}
}