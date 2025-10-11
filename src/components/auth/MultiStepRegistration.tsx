import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SocialAuthButtons } from "./SocialAuthButtons";
import { MinimalUserFields } from "./register/MinimalUserFields";
import { AcademicFields } from "./register/AcademicFields";
import { Checkbox } from "@/components/ui/checkbox";
import { useRegister } from "./register/useRegister";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface MultiStepRegistrationProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  sendVerificationEmail: (email: string, username: string) => Promise<any>;
}

export function MultiStepRegistration({ 
  loading, 
  setLoading, 
  sendVerificationEmail 
}: MultiStepRegistrationProps) {
  const [step, setStep] = useState(1);
  const [acceptsPolicy, setAcceptsPolicy] = useState(false);

  const {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    career,
    setCareer,
    semester,
    setSemester,
    gender,
    setGender,
    institutionName,
    setInstitutionName,
    academicRole,
    setAcademicRole,
    handleRegister
  } = useRegister(setLoading, sendVerificationEmail);

  const totalSteps = 2;
  const progress = (step / totalSteps) * 100;

  const handleNextStep = () => {
    if (step === 1) {
      // Validar campos mínimos del paso 1
      if (!email || !password || !username || !institutionName) {
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSkipStep = async (e: React.FormEvent) => {
    e.preventDefault();
    // Enviar formulario sin datos académicos opcionales
    await handleRegister(e);
  };

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Paso {step} de {totalSteps}</span>
          <span className="text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {step === 1 && (
        <>
          {/* Social Auth - Prominente */}
          <div className="space-y-4">
            <SocialAuthButtons 
              loading={loading} 
              setLoading={setLoading}
              mode="register"
            />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  O crea una cuenta con email
                </span>
              </div>
            </div>
          </div>

          {/* Campos Mínimos */}
          <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-4">
            <MinimalUserFields
              username={username}
              setUsername={setUsername}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              institutionName={institutionName}
              setInstitutionName={setInstitutionName}
              loading={loading}
            />

            <Button type="submit" className="w-full" disabled={loading || !email || !password || !username || !institutionName}>
              Continuar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </>
      )}

      {step === 2 && (
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-4">
            <div className="text-center space-y-2 pb-2">
              <h3 className="font-semibold text-lg">Completa tu perfil académico</h3>
              <p className="text-sm text-muted-foreground">
                Esto nos ayudará a personalizar tu experiencia
              </p>
            </div>

            <AcademicFields
              career={career}
              setCareer={setCareer}
              semester={semester}
              setSemester={setSemester}
              loading={loading}
            />

            <div>
              <label htmlFor="gender" className="block text-sm font-medium mb-1">
                Género <span className="text-muted-foreground text-xs">(opcional)</span>
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                <option value="">Selecciona tu género</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="other">Otro</option>
                <option value="prefer_not_to_say">Prefiero no decir</option>
              </select>
            </div>

            <div>
              <label htmlFor="academicRole" className="block text-sm font-medium mb-1">
                Rol académico <span className="text-muted-foreground text-xs">(opcional)</span>
              </label>
              <select
                id="academicRole"
                value={academicRole}
                onChange={(e) => setAcademicRole(e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                <option value="">Selecciona tu rol</option>
                <option value="student">Estudiante</option>
                <option value="professor">Profesor</option>
                <option value="researcher">Investigador</option>
                <option value="graduate">Egresado</option>
              </select>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox 
              id="policy-checkbox"
              checked={acceptsPolicy}
              onCheckedChange={(checked) => setAcceptsPolicy(checked === true)}
              required
            />
            <label htmlFor="policy-checkbox" className="text-sm text-muted-foreground leading-tight">
              Acepto la Política de Tratamiento de Datos Personales
            </label>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevStep}
              disabled={loading}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Atrás
            </Button>
            <Button 
              type="submit" 
              className="flex-1" 
              disabled={loading || !acceptsPolicy}
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={handleSkipStep}
            disabled={loading || !acceptsPolicy}
            className="w-full text-sm"
          >
            Completar después
          </Button>
        </form>
      )}
    </div>
  );
}
