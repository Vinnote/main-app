import { WineRepositoryPort } from "@/src/app/ports/wineRepositoryPort";
import { httpClient } from "@/src/infrastructure/httpClient";

type TransportAuthResponse = {
  access_token: string;
  user: any;
  phoneLines?: string[];
  phone_lines?: string[];
};


export class WineRepository implements WineRepositoryPort {

  async changePassword(input: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ success: boolean }> {
    await httpClient.post('/user/change-password', {
      currentPassword: input.currentPassword,
      newPassword: input.newPassword,
    });
    return { success: true };
  }

  async forgotPassword(email: string) {
    return await httpClient.post('auth/forgot-password', {
      email: email,
      company_id: companyId,
    })
  }

  async verifyResetCode(code: string, email: string) {
    return await httpClient.post('auth/verify-reset-code', { code, email })
  }

  async resetPassword(email: string, newPassword: string, code: string) {
    return await httpClient.post('auth/reset-password', {
      email,
      code,
      new_password: newPassword,
      confirm_password: newPassword,
    })
  }

  async user(email: string, document: string, birthDate: string, password: string, name: string) {

    const [day, month, year] = birthDate.split('/');
    const formattedBirthDate = `${year}-${month}-${day}`;

    return await httpClient.post('user', {
      email,
      document,
      birth_date: formattedBirthDate,
      password,
      name,
      company_id: companyId,
    })
  }

  async verifyCode(code: string, email: string, type: string) {
    return await httpClient.post('auth/verify-code', {
      code,
      email,
      type,
    })
  }

}
