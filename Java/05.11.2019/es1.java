class EsProvaCalc{
	double media(double a, double b) {
		double mia_media = (a+b)/2;
		System.out.println(mia_media);
	}
}
class CalcDemo{
	public static void main(String[] args){
		EsProvaCalc calcolatrice = new EsProvaCalc();
		int ris_media = calcolatrice.media(3,4);
	}
}