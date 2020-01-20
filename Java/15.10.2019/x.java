import java.util.Scanner;
class x {
	private static void somma(int numSomma,double vecchioNumero){
		for(int y = 1; y <= numSomma;y++) {
			Scanner numScelto = new Scanner(System.in);
			System.out.println("Inserire " + y + " numero :");
			double numInserire = numScelto.nextDouble();
			double nuovoNumero = vecchioNumero + numInserire;
			vecchioNumero = nuovoNumero;
		}
		System.out.println("Somma dei numeri: " + vecchioNumero);
		calcolatrice();
	}

	private static void differenza(int numDifferenza,double vecchioNumero){
		for(int y = 1; y <= numDifferenza;y++) {
			Scanner numScelto = new Scanner(System.in);
			System.out.println("Inserire " + y + " numero :");
			double numInserire = numScelto.nextDouble();
			if (vecchioNumero == 0) {
				vecchioNumero = numInserire;
			}else{
				double nuovoNumero = vecchioNumero - numInserire;
				vecchioNumero = nuovoNumero;
			}
		}
		System.out.println("Differenza dei numeri: " + vecchioNumero);
		calcolatrice();
	}

	private static void moltiplicazione(int numMoltiplicazione,double vecchioNumero) {
		for(int y = 1; y <= numMoltiplicazione;y++) {
			Scanner numScelto = new Scanner(System.in);
			System.out.println("Inserire " + y + " numero :");
			double numInserire = numScelto.nextDouble();
			if (vecchioNumero == 0) {
				vecchioNumero = numInserire;
			}else{
				double nuovoNumero = vecchioNumero * numInserire;
				vecchioNumero = nuovoNumero;
			}
		}
		System.out.println("Moltiplicazione dei numeri: " + vecchioNumero);
		calcolatrice();
	}

	private static void divisione(int numDivisone,double vecchioNumero) {
		for(int y = 1; y <= numDivisone;y++) {
			Scanner numScelto = new Scanner(System.in);
			System.out.println("Inserire " + y + " numero :");
			double numInserire = numScelto.nextDouble();
			if (vecchioNumero == 0) {
				vecchioNumero = numInserire;
			}else{
				double nuovoNumero = vecchioNumero / numInserire;
				vecchioNumero = nuovoNumero;
			}
		}
		System.out.println("Divisione dei numeri: " + vecchioNumero);
		calcolatrice();
	}

	public static void main(String args[]){
		System.out.println("\t Benvenuto nella calcolatrice!\n");
		calcolatrice();
	};

	private static void calcolatrice(){
		System.out.println(
		"Usare '+' per la somma\n" +
		"Usare '-' per la differenza\n" + 
		"Usare '*' moltiplicazione\n" + 
		"Usare '/' per divisione\n" + 
		"Usare 'CTRL + C' per uscire\n"
		);

		Scanner sceltaMatematica = new Scanner(System.in);
		System.out.print("Cosa desidera fare?: ");
		String sceltaNumeri = sceltaMatematica.nextLine();
		try {
			Scanner xNumeri = new Scanner(System.in);
			System.out.print("Quanti numeri vuoi inserire?: ");
			int numScelti = xNumeri.nextInt();
			if (numScelti <= 10) {
				double vecchioNumero = 0;
				switch (sceltaNumeri) {
					case "+":
						System.out.println("Somma");
						somma(numScelti,vecchioNumero);
					break;
						
					case "-":
						System.out.println("Sottrazione");
						differenza(numScelti,vecchioNumero);
					break;
						
					case "*":
						System.out.println("Moltiplicazione");
						moltiplicazione(numScelti,vecchioNumero);
					break;
						
					case "/":
						System.out.println("Divisione");
						divisione(numScelti,vecchioNumero);
					break;
						
					default:
						System.out.println("Digitare '+' o '-' o '*' o '/'");
						calcolatrice();
					break;
				};
			}else{
				System.out.println("Massimo 10 numeri!");
				calcolatrice();
			};
		}catch(Exception e){
			System.out.println("Inserire un numero!");
			calcolatrice();
		};
	};
};